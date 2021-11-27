import * as expo from './expo'
import * as stripe from './stripe'
import * as db from './db'
import * as prisma from './prisma'
import * as Sentry from './sentry'
import {
  IS_DEV,
} from '@serverless'
import {
    ContextFunction,
} from 'apollo-server-core'
import { 
  ExpressContext,
} from 'apollo-server-express'

const StaticContext = {
  ...prisma,
  ...expo,
  ...stripe,
  ...db,
  ...Sentry,
  IS_DEV,
}


export type Context = typeof StaticContext & {
  user?: any;
}

export const createContext: ContextFunction<ExpressContext, Context> = ({ req })=>  {
  return {
    ...StaticContext,
    user: req.user,
  }
}
