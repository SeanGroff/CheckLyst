import React from 'react'
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Badge } from 'react-native-elements'
import SortableListView from 'react-native-sortable-listview'

import { ICheckLyst } from '../types/items'
import { INavProps } from '../types/navigation'
import theme from '../app/theme'

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
  navigation: INavProps
  reorder(from: number, to: number, checkLyst: ICheckLyst): void
}

interface IRowProps {
  checkLyst: ICheckLyst
  navigation: INavProps
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
    borderColor: theme.palette.purple,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  itemText: {
    color: theme.palette.purple,
    flex: 2,
  },
}
