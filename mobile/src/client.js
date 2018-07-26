import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { AsyncStorage } from 'react-native'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'

import CreateClientStore from './stores/CreateClientStore'

const cache = new InMemoryCache()

const httpLink = new HttpLink({ uri: 'http://192.168.10.103:3000/graphql' })

const stateLink = CreateClientStore(cache)

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const authWithState = authLink.concat(stateLink)

const link = authWithState.concat(httpLink)

export const client = new ApolloClient({
  link,
  cache,
})

client.onResetStore(stateLink.writeDefaults)