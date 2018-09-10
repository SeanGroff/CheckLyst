import React, { Component } from 'react'
import { TextInput, Text, TextStyle, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Button } from 'react-native-elements'
import randomUuid from 'uuid/v4'
import Swipeout from 'react-native-swipeout'
import SortableListView from 'react-native-sortable-listview'

import CLButton from '../components/Button'
import { IItem, ICheckLyst } from '../types/items'
import theme from '../app/theme'

interface InterfaceProps {
  create(checkLyst: ICheckLyst): void
}

interface InterfaceState {
  inputValue: string
  inputNameValue: string
  nameHidden: boolean
  listItems: IItem[]
  newLyst: ICheckLyst
}

interface InterfaceStyles {
  home: ViewStyle
  homeHeader: TextStyle
  inputNewItem: ViewStyle
  itemsWrapper: ViewStyle
}

interface IOrder {
  from: number
  to: number
  row: { data: IItem }
}

interface ISortHandlers {
  sortHandlers: {
    onLongPress(): void
    onPressIn(): void
    onPressOut(): void
  }
}

interface IRowActions {
  row: IItem
  sortHandlers: {
    onLongPress(): void
    onPressIn(): void
    onPressOut(): void
  }
}

export default class HomeScreen extends Component<InterfaceProps, InterfaceState> {
  public state: InterfaceState = {
    inputValue: '',
    inputNameValue: '',
    nameHidden: false,
    listItems: [],
    newLyst: null,
  }

  private inputNewItem: React.RefObject<TextInput> = React.createRef()
  private inputNewName: React.RefObject<TextInput> = React.createRef()

  private handleItemSubmit = () => {
    const newLystItem: IItem = { id: randomUuid(), name: this.state.inputValue, completed: false }

    this.setState(prevState => ({
      inputValue: '',
      listItems: [...prevState.listItems, newLystItem],
    }))

    this.inputNewItem.current.clear()

    setTimeout(() => {
      this.inputNewItem.current.focus()
    }, 100)
  }

  private handleNameSubmit = () => {
    const newLyst: ICheckLyst = { id: randomUuid(), name: this.state.inputNameValue, items: [] }

    this.setState(() => ({ inputNameValue: '', nameHidden: true, newLyst }))

    this.inputNewItem.current.focus()
  }

  private handleItemPress = (selectedItem: IItem) => {
    this.setState(() => ({
      listItems: this.state.listItems.map(
        item =>
          selectedItem.name === item.name
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
      ),
    }))
  }

  private handleSavePress = async () => {
    const newCheckLyst = {
      id: randomUuid(),
      name: this.state.newLyst.name,
      items: this.state.listItems,
    }

    await this.props.create(newCheckLyst)

    this.setState(() => ({
      inputValue: '',
      inputNameValue: '',
      nameHidden: false,
      listItems: [],
      newLyst: null,
    }))

    this.inputNewName.current.focus()
  }

  private handleChange = (inputValue: string) => {
    this.setState(() => ({ inputValue }))
  }

  private handleNameChange = (inputNameValue: string) => {
    this.setState(() => ({ inputNameValue }))
  }

  private handleRowMoved = ({ from, to, row }: IOrder) => {
    const remainingItems = this.state.listItems.filter((item, index) => index !== from)

    this.setState(() => ({
      listItems: [...remainingItems.slice(0, to), row.data, ...remainingItems.slice(to)],
    }))
  }

  private handleComplete = ({ item }) => {
    console.log({ item })
  }

  private handleDelete = ({ item }) => {
    console.log({ item })
  }

  private renderRow = ({ row, sortHandlers }: IRowActions) => {
    const swipeButtons = [
      {
        backgroundColor: 'limegreen',
        text: 'complete',
        color: 'white',
        onPress: () => this.handleComplete({ item: row }),
      },
      {
        text: 'delete',
        backgroundColor: 'red',
        color: 'white',
        onPress: () => this.handleDelete({ item: row }),
      },
    ]
    return (
      <Swipeout autoClose right={swipeButtons}>
        <Button
          title={row.name}
          titleStyle={{ color: theme.palette.purple }}
          containerStyle={{ margin: 8 }}
          buttonStyle={{
            borderColor: theme.palette.purple,
            borderWidth: 1,
            backgroundColor: 'white',
          }}
          onPress={() => this.handleItemPress(row)}
          {...sortHandlers}
        />
      </Swipeout>
    )
  }

  public render() {
    return (
      <SafeAreaView style={styles.home}>
        <View style={{ flex: 2 }}>
          <Text style={styles.homeHeader}>
            {this.state.nameHidden ? 'Add Item' : 'New CheckLyst'}
          </Text>
          <View>
            <TextInput
              style={[{ display: this.state.nameHidden ? 'none' : 'flex' }, styles.inputNewItem]}
              enablesReturnKeyAutomatically
              maxLength={60}
              placeholder="e.g. Grocery Store List"
              onChangeText={inputNameValue => this.handleNameChange(inputNameValue)}
              onSubmitEditing={this.handleNameSubmit}
              ref={this.inputNewName}
              value={this.state.inputNameValue}
            />
            <TextInput
              style={[{ display: this.state.nameHidden ? 'flex' : 'none' }, styles.inputNewItem]}
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              maxLength={60}
              placeholder="e.g. Take the trash out"
              onChangeText={inputValue => this.handleChange(inputValue)}
              onSubmitEditing={this.handleItemSubmit}
              ref={this.inputNewItem}
              value={this.state.inputValue}
            />
            <View style={{ opacity: this.state.nameHidden ? 1 : 0 }}>
              <CLButton disabled={!this.state.inputValue.length} onPress={this.handleItemSubmit}>
                Add
              </CLButton>
            </View>
          </View>
        </View>
        <View style={styles.itemsWrapper}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>
            {this.state.newLyst && this.state.newLyst.name ? this.state.newLyst.name : ''}
          </Text>
          <SortableListView
            data={this.state.listItems && this.state.listItems.length ? this.state.listItems : []}
            onRowMoved={({ from, to, row }: IOrder) => this.handleRowMoved({ from, to, row })}
            renderRow={(row: IItem, { sortHandlers }: ISortHandlers) =>
              this.renderRow({ row, sortHandlers })
            }
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: 'flex-end', opacity: this.state.nameHidden ? 1 : 0 }}
        >
          <CLButton disabled={!this.state.newLyst} isSubmit onPress={this.handleSavePress}>
            Save CheckLyst
          </CLButton>
        </View>
      </SafeAreaView>
    )
  }
}

const styles: InterfaceStyles = {
  home: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  homeHeader: {
    textAlign: 'center',
    fontSize: 20,
  },
  inputNewItem: {
    height: 40,
    borderColor: theme.palette.purple,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemsWrapper: {
    flex: 3,
    padding: 20,
  },
}
