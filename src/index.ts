import { graphqlServer } from './graphqlServer'

import {
  api,
  app,
  guest,
  params,
  data,
  scheduler,
} from '@serverless'
import './rest'
import { firebaseAdmin } from '@context/firebase'
// import { updateUserAttributes } from '@cloud'

graphqlServer.start().then(() => {
  // @ts-ignore
  graphqlServer.applyMiddleware({ app: api })
})

if (params.AUTH_ENABLED) {
  api.use(async (req, res, next) => {
    const { headers: { authorization } } = req
    try {
      const decodedToken = await firebaseAdmin
        .auth()
        .verifyIdToken((authorization ?? '').replace('Bearer ', ''))
      const user = await firebaseAdmin
        .auth()
        .getUser(decodedToken.uid)
      // await updateUserAttributes(user.uid, { roles: ['admin'] })
      // console.log('DECODED_TOKEN', user)
      req.user = user
    } catch (error) {
      console.error(error)
      next(new Error('Unauthorized'))
    }
    next()
  })
}

guest.get(
  '/hello',
  (req, res) => res.send('hello public user'),
)

api.get(
  '/hello',
  (req, res) => res.send('hello API user'),
)

app.listen(
  params.PORT,
  () => console.log(`Listening on: http://localhost:${params.PORT}`),
)

// scheduler.every('5 seconds', async () => {
//   await data.create({ data: { body: { hello: 'world' }, tags: ['new'] } })
// })

// data.create({
//   data: {
//     name: 'TTL Data',
//     value: 'TTL DATA',
//   },
//   ttl: 10 * 1000,
// })

// data.onDelete({}, (data) => {
//   // console.log('data deleted', data)
// })

// scheduler.every('2 seconds', async () => {
//   const result = await data.findMany({ where: {} })
//   // console.log('RES', result)
//   await data.create({
//     data: {
//       name: 'test',
//       value: 'test',
//     },
//   })
// })
