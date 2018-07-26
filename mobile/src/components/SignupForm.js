import React, { Component } from 'react'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable'
import { TouchableOpacity, Keyboard, AsyncStorage } from 'react-native'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import { colors, fakeAvatar } from '../utils/constants'
import SIGNUP_MUTATION from '../graphql/mutations/signup'
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
  justifyContent: center
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
  bottom: 15%
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

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false,
  }
  _onOutsidePress = () => Keyboard.dismiss()
  _onChangeText = (text, type) => this.setState({ [type]: text })
  _checkIfDisabled = () => {
    const { fullName, email, password, username } = this.state
    return !fullName || !email || !password || !username
  }
  _onSignupPress = async () => {
    this.setState({ loading: true })
    const { fullName, email, password, username } = this.state
    const avatar = fakeAvatar
    try {
      const data = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          username,
          avatar,
        }
      })
      AsyncStorage.setItem('@token', data.data.signup.token).then( v => {
        this.setState({ loading: false })
        this.props.loginMutation()
      })
    } catch (error) {
      throw error
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Root onPress={this._onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
        </BackButton>
        <Wrapper>
          <Input
            autoCapitalize="words"
            placeholder="Full Name"
            onChangeText={text => this._onChangeText(text, 'fullName')} />
          <Input
            keyboardType="email-address"
            placeholder="E-mail"
            onChangeText={text => this._onChangeText(text, 'email')} />
          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={text => this._onChangeText(text, 'password')} />
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={text => this._onChangeText(text, 'username')} />
        </Wrapper>
        <ButtonConfirm
          disabled={this._checkIfDisabled()}
          onPress={this._onSignupPress}>
          <ButtonConfirmText>
            Sign Up
          </ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    )
  }
}

export default compose(
  graphql(SIGNUP_MUTATION),
  withAuth,
)(SignupForm)