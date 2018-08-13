import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { IItem } from '../types/items'
export default class LystDetailScreen extends Component {
  public render() {
    const { params } = this.props.navigation.state
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{params.name}</Text>
        {params.items.map((item: IItem) => (
          <View
            key={item.id}
            style={{
              backgroundColor: 'lightgrey',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              padding: 15,
            }}
          >
            <Text style={{ color: 'dodgerblue' }}>{item.name}</Text>
          </View>
        ))}
      </View>
    )
  }
}
