import React from 'react'
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Badge } from 'react-native-elements'
import SortableListView from 'react-native-sortable-listview'

import { ICheckLyst } from '../types/items'

interface InterfaceStyles {
  checkLyst: ViewStyle
  itemText: TextStyle
}

interface ISortHandlers {
  onLongPress(): void
  onPressIn?(): void
  onPressOut(): void
}

interface IProps {
  checkLysts: ICheckLyst[]
  navigation: { navigate(): void }
  reorder(from: number, to: number, checkLyst: ICheckLyst): void
}

interface IRowProps {
  checkLyst: ICheckLyst
  navigation: { navigate(): void }
  sortHandlers: ISortHandlers
}

function Row({ checkLyst, navigation, sortHandlers }: IRowProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('LystDetail', checkLyst)}
      style={styles.checkLyst}
      {...sortHandlers}
    >
      <Text style={[styles.itemText]}>{checkLyst.name}</Text>
      <Badge
        value={checkLyst.items.length}
        textStyle={{ color: 'white' }}
        containerStyle={{ flex: 1 }}
      />
    </TouchableOpacity>
  )
}

export default function SavedItemsList({ checkLysts, navigation, reorder }: IProps) {
  return checkLysts && checkLysts.length ? (
    <SortableListView
      data={checkLysts}
      onRowMoved={({ from, to, row }) => reorder({ from, to, checkLyst: row.data })}
      renderRow={(row: ICheckLyst) => <Row checkLyst={row} navigation={navigation} />}
    />
  ) : null
}

const styles: InterfaceStyles = {
  checkLyst: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'dodgerblue',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  itemText: {
    color: 'dodgerblue',
    flex: 2,
  },
}
