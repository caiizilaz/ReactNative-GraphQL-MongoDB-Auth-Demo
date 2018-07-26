import React, { Component } from 'react'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable'
import { TouchableOpacity, Keyboard, AsyncStorage } from 'react-native'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import { colors } from '../utils/constants'
import LOGIN_MUTATION from '../graphql/mutations/login'
import Loading from './Loading'
import { withAuth } from '../stores/AuthStore'

const Root = styled(Touchable).attrs({
  feedback: 'none'
})`
  justifyContent: center
  alignItems: center
  flex: 1
  position: relative
`

const Wrapper = styled.View`
  top: 35%;
  alignItems: center
  width: 90%
  height: 100%
`

const BackButton = styled(TouchableOpacity)`
  justifyContent: center
  alignItems: center
  position: absolute
  top: 5%
  left: 5%
`

const ButtonConfirm = styled(TouchableOpacity)`
  position: absolute
  bottom: 35%
  width: 65%
  height: 50
  backgroundColor: ${props => props.theme.PRIMARY}
  borderRadius: 10
  justifyContent: center
  alignItems: center
  shadowColor: #000
  shadowOpacity: 0.2
  shadowRadius: 5
  shadowOffset: 0px 2px
  elevation: 2
`

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE}
  fontWeight: 600
`

const ErrorText = styled.Text`
  color: red
  fontWeight: 600
`

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  underlineColorAndroid: colors.LIGHT_GRAY,
  selectionColor: colors.PRIMARY,
  autoCorrect: false,
  autoCapitalize: 'none',
})`
  height: 50px
  width: 85%
  marginVertical: 5
  color: ${props => props.theme.WHITE}
`

class LoginForm extends Component {
  state = {
    password: '',
    username: '',
    loading: false,
    error: ''
  }
  _onOutsidePress = () => Keyboard.dismiss()
  _onChangeText = (text, type) => this.setState({ [type]: text })
  _checkIfDisabled = () => {
    const { password, username } = this.state
    return !password || !username
  }
  _onLoginPress = async () => {
    this.setState({ loading: true, error: '' })
    const { password, username } = this.state
    try {
      const data = await this.props.mutate({
        variables: {
          password,
          username,
        }
      })
      await AsyncStorage.setItem('@token', data.data.login.token)
      this.props.loginMutation()
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false, 
        password: '',
        username: '', 
        error: error.toString().replace('Error: GraphQL error: ', '') 
      })
    }
  } 

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Root onPress={this._onOutsidePress}>
        <Wrapper>
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={text => this._onChangeText(text, 'username')} />
          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={text => this._onChangeText(text, 'password')} />
          <ErrorText>{this.state.error}</ErrorText>
        </Wrapper>
        <ButtonConfirm
          disabled={this._checkIfDisabled()}
          onPress={this._onLoginPress}>
          <ButtonConfirmText>
            Log In
          </ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    )
  }
}

export default compose(
  graphql(LOGIN_MUTATION),
  withAuth,
)(LoginForm)