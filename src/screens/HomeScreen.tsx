import React, { Component } from 'react'
import { Container, Subscribe } from 'unstated'

import ItemsContainer from '../state/ItemsContainer'
import HomeView from '../views/HomeView'

export default class HomeScreen extends Component<{}> {
  public render() {
    return (
      <Subscribe to={[ItemsContainer]}>
        {(items: Container<any>) => <HomeView create={items.create} />}
      </Subscribe>
    )
  }
}
