import React from 'react'
import { AsyncStorage, Button, StyleSheet, View } from 'react-native'
import { AuthSession } from 'expo'

import { SERVER_URI } from 'react-native-dotenv'

export default class AuthScreen extends React.Component {
  private _handleAuthPress = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({ authUrl: `${SERVER_URI}/auth/google` })

    if (result) {
      await AsyncStorage.setItem('accessToken', result.params.token)
      await AsyncStorage.setItem('refreshToken', result.params.refresh)
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
