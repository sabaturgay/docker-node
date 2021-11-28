import { MongoClient } from 'mongodb'
// Connection URI
const URI = process.env.DATABASE_URL
// Create a new MongoClient
export const dbClient = new MongoClient(URI)
// let dbRef = {
//   current: null
// }
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
