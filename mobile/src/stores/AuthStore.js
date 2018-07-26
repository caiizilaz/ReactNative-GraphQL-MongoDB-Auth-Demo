import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

const authDefaults = {
  isAuthenticated: false,
  avatar: '',
  username: '',
  firstName: '',
  lastName: '',
}

const authQuery = gql`
  query GetAuth {
    isAuthenticated @client
    avatar @client
    username @client
    firstName @client
    lastName @client
  }
`

const loginQuery = gql`
  mutation login {
    login @client
  }
`

const logoutQuery = gql`
  mutation logout {
    logout @client
  }
`

const addMeQuery = gql`
  mutation addMe(
    $avatar: String, 
    $username: String, 
    $firstName: String, 
    $lastName: String) {
    addMe(
      avatar: $avatar,
      username: $username,
      firstName: $firstName,
      lastName: $lastName) @client
  }
`

const login = (_obj, _args, { cache }) => {
  const data = {
    isAuthenticated: true,
  }
  cache.writeData({ data })
  return null
}

const logout = (_obj, _args, { cache }) => {
  const data = authDefaults
  cache.writeData({ data })
  return null
}

const addMe = (_obj, _args, { cache }) => {
  const data = {
    ..._args,
  }
  cache.writeData({ data })
  return null
}

const store = {
  defaults: authDefaults,
  mutations: {
    login,
    logout,
    addMe,
  },
}

const authQueryHandler = {
  props: ({ ownProps, data: {
    isAuthenticated = false,
    avatar = '',
    username = '',
    firstName = '',
    lastName = '',
  } }) => ({
    ...ownProps,
    isAuthenticated,
    avatar,
    username,
    firstName,
    lastName,
  }),
}

const withAuth = compose(
  graphql(authQuery, authQueryHandler),
  graphql(loginQuery, { name: 'loginMutation' }),
  graphql(logoutQuery, { name: 'logoutMutation' }),
  graphql(addMeQuery, { name: 'addMeMutation' }),
)

export {
  store,
  withAuth,
}
