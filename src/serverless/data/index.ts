import fs from 'fs'
import path from 'path'
import * as R from 'colay/ramda'
import Query from './query'



const initialValue = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')
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
type OperationWithOnlyWhere ={
  where: QueryData;
}


const dataManager = {
  records: initialValue as any[],
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
      where
    } = operation
    const {
      update,
      create,
    } = dataManager
    if (where) {
      const result = update({data, where})
      if (result) {
        return result
      }
    }
    create({data})
    return false
  },
  create: async (operation: Operation) => {
    const {
      data: _data,
    } = operation
    const {
      records,
      createListeners,
      callListeners,
    } = dataManager
    const data = R.clone(_data)
    records.push(data)
    callListeners(createListeners, [data])
  },
  createMany: async (operation: Operation<RowData[]>) => {
    const {
      data: _dataList,
    } = operation
    const {
      records,
      createListeners,
      callListeners,
    } = dataManager
    const dataList = R.clone(_dataList)
    records.push(...dataList)
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
      const index = records.findIndex(row => row === rowData)
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
        const index = records.findIndex(row => row === rowData)
        updateData(records, index, data)
        return records[index]
      })
      callListeners(updateListeners, updatedRowDataList)
      return updatedRowDataList
    }
    return false
  },
  delete: async (operation: OperationWithOnlyWhere) => {
    const {
      where,
    } = operation
    const {
      records,
      findUnique,
      deleteListeners,
      callListeners,
    } = dataManager
    const rowData = await findUnique(where)
    if (rowData) {
      const index = records.findIndex(row => row === rowData)
      const deletedRowData = records.splice(index, 1)[0]
      callListeners(deleteListeners, [deletedRowData])
      return deletedRowData
    }
    return false
  },
  deleteMany: async (operation: OperationWithOnlyWhere) => {
    const {
      where,
    } = operation
    const {
      records,
      findMany,
      callListeners,
      deleteListeners,
    } = dataManager
    const rowDataList = await findMany(where)
    if (rowDataList) {
      const deletedRowDataList = rowDataList.map((rowData) => {
        const index = records.findIndex(row => row === rowData)
        return records.splice(index, 1)
      })
      callListeners(deleteListeners, deletedRowDataList)
      return deletedRowDataList
    }
    return false
  },
  findUnique: async (operation: OperationWithOnlyWhere) => {
    const {
      where
    } = operation
    const {
      records
    } = dataManager
    return query(records, where)?.[0]
  },
  findMany: async (operation: OperationWithOnlyWhere) => {
    const {
      where,
    } = operation
    const {
      records
    } = dataManager
    return query(records, where)
  },
  onInsert: async (query: QueryData, callback: ListenerCallback) => {
    const {
      createListeners,
    } = dataManager
    const listener = { query, callback }
    createListeners.push(listener)
    return () => {
      const index = createListeners.findIndex(row => row === listener)
      createListeners.splice(index, 1)
    }
  },
  onUpdate: async (query: QueryData, callback: ListenerCallback) => {
    const {
      updateListeners,
    } = dataManager
    const listener = { query, callback }
    updateListeners.push(listener)
    return () => {
      const index = updateListeners.findIndex(row => row === listener)
      updateListeners.splice(index, 1)
    }
  },
  onDelete: async (query: QueryData, callback: ListenerCallback) => {
    const {
      deleteListeners,
    } = dataManager
    const listener = { query, callback }
    deleteListeners.push(listener)
    return () => {
      const index = deleteListeners.findIndex(row => row === listener)
      deleteListeners.splice(index, 1)
    }
  },
  // get
} as const

const query = (records: RowData[], queryData: QueryData): RowData[] => Query.query(
  records,
  queryData
  )

  const updateData = (records: RowData[], index: number, data: RowData) => {
    const recordIsPlainObject = R.isPlainObject(records[index])
    const dataIsPlainObject = R.isPlainObject(data)
    if (recordIsPlainObject && dataIsPlainObject) {
      records[index] = { ...records[index], ...data }
    } else {
      records[index] = data
    }
    return records[index]
  }
