import gql from 'graphql-tag'

export default gql`
  mutation login(
    $password: String!, 
    $username: String!, 
  ) {
    login(
      password: $password,
      username: $username,
    ) {
      token
    }
  }
`