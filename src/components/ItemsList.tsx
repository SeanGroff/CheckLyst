import React from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'

interface InterfaceItem {
  id: string
  name: string
  completed: boolean
}

interface InterfaceProps {
  handlePress(item: InterfaceItem): void
  items: InterfaceItem[]
}

export default function ItemsList({ handlePress, items }: InterfaceProps) {
  return items && items.length ? (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
          <Text
            style={[
              styles.itemText,
              {
                textDecorationLine: item.completed ? 'line-through' : 'none',
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  ) : null
}

const styles = {
  item: {
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
