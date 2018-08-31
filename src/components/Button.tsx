import React from 'react'
import { Button } from 'react-native-elements'

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
    <Button
      disabled={disabled}
      buttonStyle={{
        backgroundColor: isSubmit ? 'limegreen' : 'dodgerblue',
      }}
      icon={{
        name: isSubmit ? 'send' : 'add',
        size: 28,
        color: 'white',
      }}
      onPress={onPress}
      onLongPress={onLongPress}
      title={children.toUpperCase()}
    />
  )
}
