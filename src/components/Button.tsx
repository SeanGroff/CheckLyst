import React from 'react'
import { Button } from 'react-native-elements'

import theme from '../app/theme'

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
        backgroundColor: theme.palette.purple,
      }}
      icon={{
        name: isSubmit ? 'send' : 'add',
        size: 28,
        color: theme.palette.white,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
      title={children.toUpperCase()}
    />
  )
}
