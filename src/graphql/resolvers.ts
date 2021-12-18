import PrismaResolvers from './prisma/resolvers'
import Default from './Default/resolvers'
import Notifications from './Notifications/resolvers'

export default [...PrismaResolvers, Default, Notifications]
