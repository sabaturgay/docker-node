import fs from 'fs'
import path from 'path'
import * as R from 'colay/ramda'
import Query from './query'
import { scheduler } from '../scheduler'

const initialValue = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'),
)

type RowData = any
type QueryData = any
type ListenerCallback = (data: any[]) => void
type Listener = { query: QueryData, callback: ListenerCallback }
type Operation<T extends any = RowData> = {
  data: T;
}

type OperationWithOptionalWhere = {
  data: RowData;
  where?: QueryData;
}

type OperationWithWhere = Operation & {
  where: QueryData;
}
type OperationWithOnlyWhere = {
  where: QueryData;
}

type TTLOption = {
  ttl?: number;
}

type TTLRowData = {
  expiredAt: number;
  data: RowData;
}

const dataManager = {
  records: initialValue as any[],
  ttlManager: {
    interval: '600 milliseconds',
    records: [] as TTLRowData[],
    add: (data: RowData, ttl: number) => {
      const now = new Date()
      const expiredAt = new Date(now.getTime() + ttl).getTime()
      dataManager.ttlManager.records.push({
        expiredAt,
        data,
      })
    },
    check: () => {
      const {
        ttlManager,
        records,
        callListeners,
        deleteListeners,
      } = dataManager
      const deletedRowDataList = [] as RowData[]
      ttlManager.records.forEach((record) => {
        const {
          data,
          expiredAt,
        } = record
        const now = Date.now()
        if (now > expiredAt) {
          const index = records.findIndex((row) => row === data)
          const [deletedRowData] = records.splice(index, 1)
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
    listeners.forEach(({ query, callback }) => {
      const queryResult = query(data, query)
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
    } = dataManager
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
    } = dataManager
    const data = R.clone(_data)
    records.push(data)
    if (ttl) {
      dataManager.ttlManager.add(data, ttl)
    }
    callListeners(createListeners, [data])
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
    } = dataManager
    const dataList = R.clone(_dataList)
    records.push(...dataList)
    if (ttl) {
      dataList.forEach((data) => {
        dataManager.ttlManager.add(data, ttl)
      })
    }
    callListeners(createListeners, dataList)
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
    } = dataManager
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
    } = dataManager
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
    } = dataManager
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
    } = dataManager
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
    const { records } = dataManager
    return query(records, where)?.[0]
  },
  findMany: async (operation: OperationWithOnlyWhere) => {
    const { where } = operation
    const { records } = dataManager
    return query(records, where)
  },
  onInsert: async (query: QueryData, callback: ListenerCallback) => {
    const { createListeners } = dataManager
    const listener = { query, callback }
    createListeners.push(listener)
    return () => {
      const index = createListeners.findIndex((row) => row === listener)
      createListeners.splice(index, 1)
    }
  },
  onUpdate: async (query: QueryData, callback: ListenerCallback) => {
    const { updateListeners } = dataManager
    const listener = { query, callback }
    updateListeners.push(listener)
    return () => {
      const index = updateListeners.findIndex((row) => row === listener)
      updateListeners.splice(index, 1)
    }
  },
  onDelete: async (query: QueryData, callback: ListenerCallback) => {
    const { deleteListeners } = dataManager
    const listener = { query, callback }
    deleteListeners.push(listener)
    return () => {
      const index = deleteListeners.findIndex((row) => row === listener)
      deleteListeners.splice(index, 1)
    }
  },
  // get
} as const

const query = (records: RowData[], queryData: QueryData): RowData[] => Query.query(
  records,
  queryData,
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

scheduler.every(dataManager.ttlManager.interval, dataManager.ttlManager.check)

export const data = dataManager
