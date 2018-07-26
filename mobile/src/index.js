import React, { Component } from 'react'
import compose from 'recompose/compose'
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'

import AppNavigation from './navigations'
import { withAuth } from './stores/AuthStore'

class Index extends Component {
  state = {
    appIsReady: false,
  }
  componentWillMount() {
    this._checkIfToken()
  }
  _checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if (token) {
        await this.props.loginMutation()
      }
    } catch (error) {
      throw error
    }
    this.setState({ appIsReady: true })
  }
  render() {
    const { appIsReady } = this.state
    if (!appIsReady) return <AppLoading />
    return (
      <AppNavigation />
    )
  }
}

export default compose(withAuth)(Index)
