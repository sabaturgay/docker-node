/* eslint-disable import/first */
import { 
  app,
  api,
  guest,
  params,
} from '@serverless'
import { PrismaSelect } from '@paljs/plugins'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLResolveInfo } from 'graphql'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { createContext, Context } from './context'

// eslint-disable-next-line @typescript-eslint/no-var-requires
import _typeDefs from './graphql/typeDefs'
import _resolvers from './graphql/resolvers'
import extendResolvers from './extend/resolvers'
import extendTypeDefs from './extend/typeDefs'
import { IS_DEV } from '@serverless'
import * as directives from './directives'

// import './test'

const PORT = 8080

const directiveTypeDefs = Object.values(directives)
  .map((directive) => directive.definition)

const resolvers = [..._resolvers, ...extendResolvers]
const typeDefs = mergeTypeDefs([_typeDefs, ...extendTypeDefs, ...directiveTypeDefs])

// OVERRIDE


let schema = makeExecutableSchema({ typeDefs, resolvers })
  Object.values(directives)
    .map((directive) => {
      schema = directive.transformer(schema, directive.directiveName)
    })

const middleware = async (
  resolve,
  root,
  args,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const result = new PrismaSelect(info).value
  if (!result.select || Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    }
  }
  return resolve(root, args, context, info)
}

schema = applyMiddleware(schema, middleware)

const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
      ...(
        IS_DEV
          ? [
            ApolloServerPluginLandingPageGraphQLPlayground({
              // options
            }),
          ]
          : []
      ),
    ],
  })
  server.start().then(() => {
    // @ts-ignore
    server.applyMiddleware({ app: api })
  })
  // app.use(passport.initialize())
  // app.use(passport.session())
  if (params.AUTH_ENABLED) {
    // apiRouter.use(passport.authenticate('jwt'))
    api.use(async (req, res, next) => {
      const {
        headers: {
          authorization,
        },
      } = req
      try {
        const decodedToken = {}
        // await getCognitoUser(
        //   jwtFromRequest(req)
        // )
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

  app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`))

