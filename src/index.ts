import { graphqlServer } from './graphqlServer'

import {
  api,
  app,
  guest,
  params,
} from '@serverless'

graphqlServer.start().then(() => {
  // @ts-ignore
  graphqlServer.applyMiddleware({ app: api })
})

// app.use(passport.initialize())
// app.use(passport.session())

if (params.AUTH_ENABLED) {
  // apiRouter.use(passport.authenticate('jwt'))
  api.use(async (req, res, next) => {
    const { headers: { authorization } } = req
    try {
      const decodedToken = {}
      req.user = decodedToken
    } catch (error) {
      console.log(error)
      next(new Error('Unauthorized'))
    }
    next()
  })
}

guest.get('/hello', (req, res) => res.send('hello public user'))

api.get('/hello', (req, res) => res.send('hello API user'))

app.listen(
  params.PORT,
  () => console.log(`Listening on: http://localhost:${params.PORT}`),
)
