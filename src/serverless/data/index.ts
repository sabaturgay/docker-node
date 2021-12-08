import { PrismaClient } from './client'

const prisma = new PrismaClient()

prisma.$connect()

export const data = prisma.dataItem
