import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons'
import { MaterialIcons } from '@expo/vector-icons'

import { INavProps } from '../types/navigation'
import { IItem } from '../types/items'

function FriendsIcon(props: any) {
  return <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={32} color="dodgerblue" />
}

export default class LystDetailScreen extends Component<INavProps, null> {
  private static navigationOptions = ({ navigation }: INavProps) => ({
    title: navigation.getParam('name'),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={FriendsIcon}>
        <HeaderButtons.Item
          title="add person"
          iconName="person-add"
          onPress={() => alert('add friend')}
        />
      </HeaderButtons>
    ),
  })

  public render() {
    const { params } = this.props.navigation.state
    return (
      <View style={{ flex: 1 }}>
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
