import React, { Component } from 'react'
import { AsyncStorage, Text } from 'react-native'
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import { Provider } from 'unstated'

import '../../ReactotronConfig'
import HomeScreen from '../screens/HomeScreen'
import CheckLystsScreen from '../screens/CheckLystsScreen'
import ItemsContainer from '../state/ItemsContainer'
import LystDetailScreen from '../screens/LystDetailScreen'
import AuthScreen from '../screens/AuthScreen'

const LystStack = createStackNavigator({
  Saved: CheckLystsScreen,
  LystDetail: LystDetailScreen,
})

const TabScreens = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Saved: LystStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const icon = {
          name: '',
          size: 0,
        }

        if (routeName === 'Home') {
          icon.name = 'home'
          icon.size = 25
        } else if (routeName === 'Saved') {
          icon.name = 'tasks'
          icon.size = 20
        }

        return <FontAwesome name={icon.name} size={icon.size} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'dodgerblue',
      inactiveTintColor: 'lightgray',
    },
  }
)

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Home: TabScreens,
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)

const DrawerNav = createDrawerNavigator({
  Home: TabScreens,
  Saved: LystStack,
})

const items = new ItemsContainer()

interface IState {
  loading: boolean
  isAuthenticated: boolean
}

export default class RootComponent extends Component<null, IState> {
  public state = {
    loading: true,
    isAuthenticated: false,
  }

  public async componentDidMount() {
    try {
      const tokens = await AsyncStorage.multiGet(['accessToken', 'refreshToken'])
      const aToken = tokens[0][1]
      const rToken = tokens[1][1]

      if (!aToken || !rToken) {
        this.setState(() => ({
          loading: false,
          isAuthenticated: false,
        }))
      } else {
        this.setState(() => ({
          loading: false,
          isAuthenticated: true,
        }))
      }
    } catch (err) {
      this.setState(() => ({
        loading: false,
        isAuthenticated: false,
      }))
    }
  }

  public render() {
    const { loading, isAuthenticated } = this.state
    return (
      <Provider inject={[items]}>
        {loading ? (
          <Text style={{ color: 'dodgerblue' }}>Loading...</Text>
        ) : isAuthenticated ? (
          <DrawerNav />
        ) : (
          <AuthStack />
        )}
      </Provider>
    )
  }
}
