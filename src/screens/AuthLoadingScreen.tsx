import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, View } from 'react-native'

import { INavProps } from '../types/navigation'

export default class AuthLoadingScreen extends Component<INavProps, null> {
  public async componentDidMount() {
    try {
      const { navigation } = this.props
      const tokens = await AsyncStorage.multiGet(['accessToken', 'refreshToken'])
      const aToken = tokens[0][1]
      const rToken = tokens[1][1]

      if (!aToken || !rToken) {
        navigation.navigate('Auth')
      } else {
        navigation.navigate('App')
      }
    } catch (err) {
      this.props.navigation.navigate('Auth')
    }
  }
  public render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    )
  }
}
