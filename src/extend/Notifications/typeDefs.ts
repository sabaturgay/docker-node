import gql from 'graphql-tag'

export default gql`
  type Query { 
    extend: String
  }
  type Mutation { 
    sendNotifications(pushTokens: [String], message: NotificationMessageInput): Boolean
  }
  input NotificationMessageInput {
    sound: String
    body: String!
    data: JSON
  }
`
