import React, { Component } from 'react'
import { createBottomTabNavigator, createStackNavigator, addNavigationHelpers } from 'react-navigation'
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import AuthenticateScreen from './screens/AuthenticateScreen'

import { colors } from './utils/constants'
import HeaderAvatar from './components/HeaderAvatar'
import ButtonHeader from './components/ButtonHeader'
import compose from 'recompose/compose'
import { withAuth } from './stores/AuthStore'

const TAB_ICON_SIZE = 20

const Tabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />
      )
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />
      )
    })
  },
}, {
    lazy: true,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.WHITE,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      showIcon: true,
      showLabel: false
    }
  })

const AppMainNav = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderAvatar />,
      headerRight: (
        <ButtonHeader side="right" onPress={() => navigation.navigate('Profile')}>
          <SimpleLineIcons color={colors.PRIMARY} size={20} name="options-vertical" />
        </ButtonHeader>
      )
    })
  },
}, {
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
        alignSelf: 'center',
      },
    })
  })

class AppNavigator extends Component {
  render() {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      return <AuthenticateScreen />
    }
    return <AppMainNav />
  }
}

export default compose(withAuth)(AppNavigator)

export const router = AppMainNav.router