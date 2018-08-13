import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SortableListView from 'react-native-sortable-listview'

import { ICheckLyst } from '../types/items'

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

const styles = {
  checkLyst: {
    borderWidth: 2,
    borderColor: 'dodgerblue',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  itemText: {
    color: 'dodgerblue',
  },
}
