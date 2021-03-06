import { Resolvers } from '@type'
import {
  Expo,
  ExpoPushMessage,
  ExpoPushTicket,
} from 'expo-server-sdk'

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    sendNotifications: async (_parent, args, { expo, IS_DEV }) => {
      const {
        pushTokens,
        message,
      } = args
      const messages = [] as ExpoPushMessage[]
      pushTokens.forEach((pushToken: string) => {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`)
          return
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
          to: pushToken,
          ...message,
          // sound: 'default',
          // body: 'This is a test notification',
          // data: { withSome: 'data' },
        })
      })

      const chunks = expo.chunkPushNotifications(messages)
      const tickets = [] as ExpoPushTicket[]
      (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        chunks.forEach(async (chunk) => {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
            console.log(ticketChunk)
            tickets.push(...ticketChunk)
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          } catch (error) {
            console.error(error)
          }
        })
      })()
      if (IS_DEV) {
        checkNotificationErrors(tickets, expo)
      }
      return true
    },
  },
}
export default resolvers

// CHECK NOTIFICATIONS
const checkNotificationErrors = (tickets: ExpoPushTicket[], expo: Expo) => {
  const receiptIds = [] as string[]
  tickets.forEach((ticket) => {
  // NOTE: Not all tickets have IDs; for example, tickets for notifications
  // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  })
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
  // Like sending notifications, there are different strategies you could use
  // to retrieve batches of receipts from the Expo service.
    receiptIdChunks.forEach(async (chunk) => {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk)
        console.log('RECEIPT', receipts)

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        Object.keys(receipts).forEach((receiptId) => {
          const {
            status, message, details,
          } = receipts[receiptId]
          if (status === 'ok') {
            return
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`,
            )
            if (details && details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`)
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    })
  })()
}
