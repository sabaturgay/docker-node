import Kafka from 'node-rdkafka'
import { params } from '@serverless/params'

const {
  KAFKA_BOOTSTRAP_SERVERS,
  KAFKA_SASL_USERNAME,
  KAFKA_SASL_PASSWORD,
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_SASL_MECHANISMS,
  KAFKA_GROUP_ID,
} = params

function createConsumer() {
  const consumer = new Kafka.KafkaConsumer({
    'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS,
    'sasl.username': KAFKA_SASL_USERNAME,
    'sasl.password': KAFKA_SASL_PASSWORD,
    'security.protocol': KAFKA_SECURITY_PROTOCOL,
    'sasl.mechanisms': KAFKA_SASL_MECHANISMS,
    'group.id': KAFKA_GROUP_ID,
  }, { 'auto.offset.reset': 'earliest' })

  return new Promise((resolve, reject) => {
    consumer
      .on('ready', () => resolve(consumer))

    consumer.connect()
  })
}

const run = async () => {
  const consumer = await createConsumer()

  consumer.on('data', async ({
    key, value, partition, offset,
  }) => {
    console.log(`Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}. `)
  })

  consumer.subscribe([config.topic])
  consumer.consume()

  process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...')
    consumer.disconnect()
  })
}

const ERR_TOPIC_ALREADY_EXISTS = 36;

function ensureTopicExists(config) {
  const adminClient = Kafka.AdminClient.create({
    'bootstrap.servers': config['bootstrap.servers'],
    'sasl.username': config['sasl.username'],
    'sasl.password': config['sasl.password'],
    'security.protocol': config['security.protocol'],
    'sasl.mechanisms': config['sasl.mechanisms']
  });

  return new Promise((resolve, reject) => {
    adminClient.createTopic({
      topic: config.topic,
      num_partitions: 1,
      replication_factor: 3
    }, (err) => {
      if (!err) {
        console.log(`Created topic ${config.topic}`);
        return resolve();
      }

      if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
        return resolve();
      }

      return reject(err);
    });
  });
}

function createProducer(config, onDeliveryReport) {
  const producer = new Kafka.Producer({
    'bootstrap.servers': config['bootstrap.servers'],
    'sasl.username': config['sasl.username'],
    'sasl.password': config['sasl.password'],
    'security.protocol': config['security.protocol'],
    'sasl.mechanisms': config['sasl.mechanisms'],
    'dr_msg_cb': true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

async function produceExample() {
  const config = await configFromCli();

  if (config.usage) {
    return console.log(config.usage);
  }

  await ensureTopicExists(config);

  const producer = await createProducer(config, (err, report) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const {topic, partition, value} = report;
      console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
    }
  });

  for (let idx = 0; idx < 10; ++idx) {
    const key = 'alice';
    const value = Buffer.from(JSON.stringify({ count: idx }));

    console.log(`Producing record ${key}\t${value}`);

    producer.produce(config.topic, -1, value, key);
  }

  // producer.flush(10000, () => {
  //   producer.disconnect();
  // });
}