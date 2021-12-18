import { MongoClient } from 'mongodb'
import { params } from '@serverless'

// Connection URI
const URI = params.DATABASE_URL

// Create a new MongoClient
export const dbClient = new MongoClient(URI)

async function run() {
  await dbClient.connect()
  await dbClient.db('admin').command({ ping: 1 })
  console.log('Connected successfully to DB')
}
run().catch(console.dir)

export const idMapper = (value: any | any[]) => {
  let list = value
  if (!Array.isArray(value)) {
    list = [value]
  }
  return list.map((item) => {
    const {
      _id,
      ...rest
    } = item
    return { ...rest, id: item._id }
  })
}
