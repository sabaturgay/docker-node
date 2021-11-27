import gql from 'graphql-tag'

export default gql`
  type Query { 
    extend: String
  }
  type Mutation { 
    extend: String
  }
  scalar JSON
`
