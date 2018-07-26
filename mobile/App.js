import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { ThemeProvider } from 'styled-components'

import Index from './src/index'
import { client } from './src/client'
import { colors } from './src/utils/constants'

class App extends React.Component {

  render() {

    return (
      <ApolloProvider client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <Index />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    )
  }
}

export default App