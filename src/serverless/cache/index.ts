import fs from 'fs'
import path from 'path'
import * as R from 'colay/ramda'
import Query from './Query'
import { scheduler } from '../scheduler'

const initialValue = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'),
)

type RowData = any
type WhereData = any
type ListenerCallback = (data: any[]) => void
type Listener = { where: WhereData, callback: ListenerCallback }
type Operation<T extends any = RowData> = {
  data: T;
}

type OperationWithOptionalWhere = {
  data: RowData;
  where?: WhereData;
}

type OperationWithWhere = Operation & {
  where: WhereData;
}
type OperationWithOnlyWhere = {
  where: WhereData;
}

type TTLOption = {
  ttl?: number;
}

type TTLRowData = {
  expiredAt: number;
  data: RowData;
}

const cacheManager = {
  records: initialValue as any[],
  ttlManager: {
    interval: '600 milliseconds',
    records: [] as TTLRowData[],
    add: (data: RowData, ttl: number) => {
      const now = new Date()
      const expiredAt = new Date(now.getTime() + ttl).getTime()
      cacheManager.ttlManager.records.push({
        expiredAt,
        data,
      })
    },
    check: () => {
      if (cacheManager.ttlManager.records.length === 0) {
        return
      }
      const {
        ttlManager,
        records,
        callListeners,
        deleteListeners,
      } = cacheManager
      const deletedRowDataList = [] as RowData[]
      ttlManager.records.forEach((record, index) => {
        const {
          data,
          expiredAt,
        } = record
        const now = Date.now()
        if (now > expiredAt) {
          ttlManager.records.splice(index, 1)
          const rowDataIndex = records.findIndex((row) => row === data)
          const [deletedRowData] = records.splice(rowDataIndex, 1)
          deletedRowDataList.push(deletedRowData)
        }
      })
      if (deletedRowDataList.length > 0) {
        callListeners(deleteListeners, deletedRowDataList)
      }
    },
  },
  createListeners: [] as Listener[],
  updateListeners: [] as Listener[],
  deleteListeners: [] as Listener[],
  callListeners: (listeners: Listener[], data: RowData[]) => {
    listeners.forEach(({ where, callback }) => {
      const queryResult = query(data, where)
      if (queryResult.length > 0) {
        callback(queryResult)
      }
    })
  },
  upsert: async (operation: OperationWithWhere) => {
    const {
      data,
      where,
    } = operation
    const {
      update,
      create,
    } = cacheManager
    if (where) {
      const result = update({ data, where })
      if (result) {
        return result
      }
    }
    create({ data })
    return false
  },
  create: async (operation: Operation & TTLOption) => {
    const {
      data: _data,
      ttl,
    } = operation
    const {
      records,
      createListeners,
      callListeners,
    } = cacheManager
    const data = R.clone(_data)
    records.push(data)
    if (ttl) {
      cacheManager.ttlManager.add(data, ttl)
    }
    callListeners(createListeners, [data])
    return data
  },
  createMany: async (operation: Operation<RowData[]> & TTLOption) => {
    const {
      data: _dataList,
      ttl,
    } = operation
    const {
      records,
      createListeners,
      callListeners,
    } = cacheManager
    const dataList = R.clone(_dataList)
    records.push(...dataList)
    if (ttl) {
      dataList.forEach((data) => {
        cacheManager.ttlManager.add(data, ttl)
      })
    }
    callListeners(createListeners, dataList)
    return dataList
  },
  update: async (operation: OperationWithWhere) => {
    const {
      data: _data,
      where,
    } = operation
    const {
      records,
      findUnique,
      updateListeners,
      callListeners,
    } = cacheManager
    const data = R.clone(_data)
    const rowData = await findUnique(where)
    if (rowData) {
      const index = records.findIndex((row) => row === rowData)
      const newData = updateData(records, index, data)
      callListeners(updateListeners, [newData])
      return records[index]
    }
    return false
  },
  updateMany: async (operation: OperationWithWhere) => {
    const {
      data: _data,
      where,
    } = operation
    const {
      records,
      findMany,
      callListeners,
      updateListeners,
    } = cacheManager
    const data = R.clone(_data)
    const rowDataList = await findMany(where)
    if (rowDataList) {
      const updatedRowDataList = rowDataList.map((rowData: RowData) => {
        const index = records.findIndex((row) => row === rowData)
        updateData(records, index, data)
        return records[index]
      })
      callListeners(updateListeners, updatedRowDataList)
      return updatedRowDataList
    }
    return false
  },
  delete: async (operation: OperationWithOnlyWhere) => {
    const { where } = operation
    const {
      records,
      findUnique,
      deleteListeners,
      callListeners,
    } = cacheManager
    const rowData = await findUnique(where)
    if (rowData) {
      const index = records.findIndex((row) => row === rowData)
      const deletedRowData = records.splice(index, 1)[0]
      callListeners(deleteListeners, [deletedRowData])
      return deletedRowData
    }
    return false
  },
  deleteMany: async (operation: OperationWithOnlyWhere) => {
    const { where } = operation
    const {
      records,
      findMany,
      callListeners,
      deleteListeners,
    } = cacheManager
    const rowDataList = await findMany(where)
    if (rowDataList) {
      const deletedRowDataList = rowDataList.map((rowData) => {
        const index = records.findIndex((row) => row === rowData)
        return records.splice(index, 1)
      })
      callListeners(deleteListeners, deletedRowDataList)
      return deletedRowDataList
    }
    return false
  },
  findUnique: async (operation: OperationWithOnlyWhere) => {
    const { where } = operation
    const { records } = cacheManager
    return query(records, where)?.[0]
  },
  findMany: async (operation: OperationWithOnlyWhere) => {
    const { where } = operation
    const { records } = cacheManager
    return query(records, where)
  },
  onCreate: async (where: WhereData, callback: ListenerCallback) => {
    const { createListeners } = cacheManager
    const listener = { where, callback }
    createListeners.push(listener)
    return () => {
      const index = createListeners.findIndex((row) => row === listener)
      createListeners.splice(index, 1)
    }
  },
  onUpdate: async (where: WhereData, callback: ListenerCallback) => {
    const { updateListeners } = cacheManager
    const listener = { where, callback }
    updateListeners.push(listener)
    return () => {
      const index = updateListeners.findIndex((row) => row === listener)
      updateListeners.splice(index, 1)
    }
  },
  onDelete: async (where: WhereData, callback: ListenerCallback) => {
    const { deleteListeners } = cacheManager
    const listener = { where, callback }
    deleteListeners.push(listener)
    return () => {
      const index = deleteListeners.findIndex((row) => row === listener)
      deleteListeners.splice(index, 1)
    }
  },
  // get
} as const

const query = (records: RowData[], where: WhereData): RowData[] => Query.query(
  records,
  where,
)

const updateData = (records: RowData[], index: number, data: RowData) => {
  const recordIsPlainObject = R.isPlainObject(records[index])
  const dataIsPlainObject = R.isPlainObject(data)
  if (recordIsPlainObject && dataIsPlainObject) {
    Object.keys(data).forEach((key) => {
      records[index][key] = data[key]
    })
    // records[index] = { ...records[index], ...data }
  } else {
    records[index] = data
  }
  return records[index]
}

scheduler.every(cacheManager.ttlManager.interval, cacheManager.ttlManager.check)

export const cache = cacheManager
