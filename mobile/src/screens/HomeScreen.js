import React, { Component } from 'react'
import styled from 'styled-components/native'
import compose from 'recompose/compose'
import { AsyncStorage } from 'react-native';
import { withAuth } from '../stores/AuthStore'
import { withApollo } from 'react-apollo'
import ME_QUERY from '../graphql/queries/me'
import Loading from '../components/Loading'

const Root = styled.View``

const T = styled.Text``


class HomeScreen extends Component {
  componentDidMount() {
    this._getUserInfo()
  }
  _getUserInfo = async () => {
    try {
      const { data: { me } } = await this.props.client.query({
        query: ME_QUERY,
        fetchPolicy: 'network-only',
      })
      await this.props.addMeMutation({ variables: { ...me } })
    } catch (error) {
      this.props.client.onResetStore()
      this.props.logoutMutation()
      await AsyncStorage.removeItem('@token')
    }
  }
  render() {
    const { username, firstName } = this.props
    if (!username || !firstName) return <Loading />
    return (
      <Root>
        <T>username: {username}</T>
        <T>firstName: {firstName}</T>
      </Root>
    )
  }
}

export default withApollo(
  compose(
    withAuth,
  )(HomeScreen)
)