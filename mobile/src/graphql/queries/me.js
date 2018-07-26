import gql from 'graphql-tag'

export default gql`
  query MeQuery {
    me {
      avatar
      username
      firstName
      lastName
    }
  }
`