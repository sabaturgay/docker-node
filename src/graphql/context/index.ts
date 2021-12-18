import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import { IS_DEV } from '@serverless'
import { getUserRoles } from '@cloud'

import * as Sentry from '@api/sentry'
import * as db from '@api/db'
import * as expo from '@api/expo'
import * as firebase from '@api/firebase'
import * as prisma from '@api/prisma'
import * as stripe from '@api/stripe'

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
