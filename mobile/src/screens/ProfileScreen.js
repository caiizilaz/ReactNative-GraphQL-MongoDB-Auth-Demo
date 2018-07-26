import React, { Component } from 'react'
import styled from 'styled-components/native'
import compose from 'recompose/compose'
import Loading from '../components/Loading'
import { withAuth } from '../stores/AuthStore'

const Root = styled.View``

const T = styled.Text``

class ProfileScreen extends Component {
  render() {
    const { username, firstName } = this.props
    if (!username || !firstName) return <Loading />
    return (
      <Root>
        <T>Profile</T>
        <T>username: {username}</T>
        <T>firstName: {firstName}</T>
      </Root>
    )
  }
}

export default compose(
  withAuth,
)(ProfileScreen)
