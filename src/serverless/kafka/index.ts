import { Kafka } from 'kafkajs'
import { params } from '@serverless/params'
// import * as R from 'colay/ramda'

const CLIENT_ID = 'node-app'// R.uuid()

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: params.KAFKA_BROKERS,
  ssl: true,
  sasl: {
    mechanism: 'plain', // scram-sha-256 or scram-sha-512
    username: params.KAFKA_USERNAME,
    password: params.KAFKA_PASSWORD,
  },
})

export const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
})
export const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect()
  console.log('Producer connected')
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  // Consuming
  await consumer.connect()
  console.log('Consumer connected')
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.subscribe({ topic: 'user-created', fromBeginning: true })
  await consumer.subscribe({ topic: 'user-deleted', fromBeginning: true })
  await consumer.subscribe({ topic: 'every-24-hours', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({
      topic, partition, message,
    }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
    },
  })
}

run().catch(console.error)
