import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Subscribe } from 'unstated'
import { SafeAreaView } from 'react-navigation'

import ItemsContainer from '../state/ItemsContainer'
import SavedItemsList from '../components/SavedItemsList'
import { INavProps } from '../types/navigation'

export default class CheckLysts extends Component<INavProps, null> {
  public render() {
    return (
      <Subscribe to={[ItemsContainer]}>
        {items => (
          <SafeAreaView style={{ flex: 1 }}>
            <SavedItemsList
              checkLysts={items.state.savedCheckLysts}
              navigation={this.props.navigation}
              reorder={items.reorder}
            />
          </SafeAreaView>
        )}
      </Subscribe>
    )
  }
}
