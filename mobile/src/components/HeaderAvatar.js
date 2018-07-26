import React, { Component } from 'react'
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import Loading from './Loading'
import ButtonHeader from './ButtonHeader'
import { fakeAvatar } from '../utils/constants'
import compose from 'recompose/compose'
import { withAuth } from '../stores/AuthStore'
import { withApollo } from 'react-apollo'

const AVATAR_SIZE = 30
const AVATAR_RADIUS = AVATAR_SIZE / 2

const Avatar = styled.Image`
  height: ${AVATAR_SIZE}
  width: ${AVATAR_SIZE}
  borderRadius: ${AVATAR_RADIUS}
`

class HeaderAvatar extends Component {
  state = {}
  _onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel']
    const destructiveButtonIndex = 0
    this.props.showActionSheetWithOptions({
      options,
      destructiveButtonIndex
    }, async buttonIndex => {
      if (buttonIndex === 0) {
        this.props.client.onResetStore()
        this.props.logoutMutation()
        await AsyncStorage.removeItem('@token')
      }
    })
  }
  render() {
    const { username, avatar } = this.props
    if (!username) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small" />
        </ButtonHeader>
      )
    }
    return (
      <ButtonHeader side="left" onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: avatar }} />
      </ButtonHeader>
    )
  }
}

export default withApollo(
  compose(
    connectActionSheet,
    withAuth,
  )(HeaderAvatar)
)