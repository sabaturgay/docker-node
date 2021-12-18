import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { GraphQLResolveInfo } from 'graphql'
import { IS_DEV } from '@serverless'
import { PrismaSelect } from '@paljs/plugins'
import resolvers from './graphql/resolvers'
import prismaTypeDefs from './graphql/prisma/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
// import extendTypeDefs from './extend/typeDefs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs } from '@graphql-tools/merge'
import * as R from 'colay/ramda'
import * as directives from './directives'
import glob from 'glob'
import fs from 'fs'
import { Context, createContext } from '@context'
import gql from 'graphql-tag'

const gqlFiles = glob.sync('**/*.gql', { absolute: true })
const extendTypeDefs = gqlFiles
  .map((file) => fs.readFileSync(file, 'utf8'))
  .map((gqlText) => gql(gqlText))

const directiveTypeDefs = Object.values(directives)
  .map((directive) => directive.definition)

const typeDefs = mergeTypeDefs([prismaTypeDefs, ...extendTypeDefs, ...directiveTypeDefs])

let schema = makeExecutableSchema({ typeDefs, resolvers })
Object.values(directives)
  .forEach((directive) => {
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

const AUTH_PATHS = { Query: { findManyPost: { roles: ['admin'] } } }

const authMiddleware = async (
  resolve,
  root,
  args,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const {
    key,
    typename,
  } = info.path
  const pathRoles = AUTH_PATHS[typename]?.[key]?.roles
  if (pathRoles) {
    const { userRoles } = context
    if (R.intersection(pathRoles, userRoles).length === 0) {
      throw new Error(`Unauthorized access to ${typename}.${key}. Only ${pathRoles} are allowed`)
    }
  }

  return resolve(root, args, context, info)
}

schema = applyMiddleware(
  schema,
  middleware,
  authMiddleware,
)

export const graphqlServer = new ApolloServer({
  schema,
  context: createContext,
  plugins: [
    ...(
      IS_DEV
        ? [
          ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
        : []
    ),
  ],
})
