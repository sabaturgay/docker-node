import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import { IS_DEV } from '@serverless'
import { getUserRoles } from '@cloud'

import * as Sentry from './sentry'
import * as db from './db'
import * as expo from './expo'
import * as firebase from './firebase'
import * as prisma from './prisma'
import * as stripe from './stripe'

const StaticContext = {
  ...prisma,
  ...expo,
  ...stripe,
  ...db,
  ...Sentry,
  ...firebase,
  IS_DEV,
}

export type Context = typeof StaticContext & {
  user?: any;
}

export const createContext: ContextFunction<ExpressContext, Context> = ({ req }) => ({
  ...StaticContext,
  user: req.user,
  userRoles: getUserRoles(req.user),
})
