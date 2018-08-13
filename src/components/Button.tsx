/**
 * @todo Refactor to a render prop!
 */

import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
// import { Button } from 'react-native-elements'

interface InterfaceButton {
  children: string
  disabled?: boolean
  isSubmit?: boolean
  onPress(): void
  onLongPress?(): void
}

export default function CLButton({
  children,
  disabled = false,
  isSubmit = false,
  onPress,
  onLongPress,
}: InterfaceButton) {
  return (
    <TouchableOpacity>{children}</TouchableOpacity>
    // <Button
    //   disabled={disabled}
    //   buttonStyle={{
    //     backgroundColor: isSubmit ? 'limegreen' : 'dodgerblue',
    //   }}
    //   icon={{
    //     name: isSubmit ? 'send' : 'add',
    //     size: 28,
    //     color: 'white',
    //   }}
    //   onPress={onPress}
    //   onLongPress={onLongPress}
    //   title={children.toUpperCase()}
    // />
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'dodgerblue',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
})
