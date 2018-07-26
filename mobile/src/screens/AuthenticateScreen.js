import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const Root = styled.View`
  flex:1
  backgroundColor: ${props => props.theme.SECONDARY}
  position: relative
`

const BottomTextContainer = styled.View`
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 200
  justifyContent: center
  alignItems: center
`

const Button = styled(TouchableOpacity)`
  justifyContent: center
  alignItems: center
`

const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE}
  fontWeight: 400
  fontSize: 16
`

const T = styled.Text`
  color: ${props => props.theme.WHITE}
  fontWeight: 700
  fontSize: 35
  textAlign: center
  top: 15%
  fontStyle: italic
`

const initialState = {
  showSignup: false,
}

class AuthenticateScreen extends Component {
  state = initialState

  _onSignupPress = () => this.setState({ showSignup: true })
  _onBackPress = () => this.setState({ ...initialState })

  render() {
    if (this.state.showSignup) {
      return (
        <Root>
          <SignupForm onBackPress={this._onBackPress} />
        </Root>
      )
    }
    return (
      <Root>
        <T>Login Demo</T>
        <LoginForm />
        <BottomTextContainer>
          <Button onPress={this._onSignupPress}>
            <ButtonText>
              Don't have an account yet?
            </ButtonText>
          </Button>
        </BottomTextContainer>
      </Root>
    )
  }
}

export default AuthenticateScreen
