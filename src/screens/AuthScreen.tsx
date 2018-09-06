import React from 'react'
import { Alert, AsyncStorage, Button, StyleSheet, View } from 'react-native'
import { AuthSession } from 'expo'
import { SERVER_URI } from 'react-native-dotenv'

import { INavProps } from '../types/navigation'

export default class AuthScreen extends React.Component<INavProps, null> {
  private _handleAuthPress = async () => {
    try {
      const result = await AuthSession.startAsync({
        authUrl: `${SERVER_URI}/auth/google`,
      })

      if (result) {
        await AsyncStorage.multiSet([
          ['accessToken', result.params.token],
          ['refreshToken', result.params.refresh],
        ])

        this.props.navigation.navigate('App')
      }
    } catch (err) {
      Alert.alert('Failed to authenticate')
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this._handleAuthPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
