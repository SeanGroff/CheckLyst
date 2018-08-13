import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Subscribe } from 'unstated'
import { SafeAreaView } from 'react-navigation'

import ItemsContainer from '../state/ItemsContainer'
import SavedItemsList from '../components/SavedItemsList'
import { IItem, ICheckLyst } from '../types/items'

export default class CheckLysts extends Component {
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
