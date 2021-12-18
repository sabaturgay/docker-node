import { Resolvers } from '@type'

const resolvers: Resolvers = {
  Query: {
    default: async (_parent, args, { prisma }) => {
      console.log('Default')
      return 'default'
    },
  },
  Mutation: {
    default: async (_parent, args, { prisma }) => {
      console.log('Default')
      return 'default'
    },
  },
}
export default resolvers
