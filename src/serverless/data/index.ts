// path.join(__dirname, '..') to dirname
import { PrismaClient } from './client'

const prisma = new PrismaClient()

prisma.$connect()

export const data = prisma.dataItem

export const dataPrisma = prisma

