import { Resolvers } from '@type'

const resolvers: Resolvers = {
  Query: {
    extend: async (_parent, args, { prisma }) => {
      console.log('Extend')
      return 'extend'
    },
  },
  Mutation: {
    extend: async (_parent, args, { prisma }) => {
      console.log('Extend')
      return 'extend'
    },
  },
}
export default resolvers
