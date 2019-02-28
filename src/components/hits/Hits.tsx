import React from 'react'
// First, we need to import the FlatList and other React Native component
import { View, FlatList, Image, Text } from 'react-native'
// We also need to add the connectInfiniteHits connector to our import
import { connectInfiniteHits } from 'react-instantsearch-native'

// [...]

export const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
    if (hasMore) {
      refine()
    }
  }

  return (
    <FlatList
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: item.image }}
            />
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
            </View>
          </View>
        )
      }}
    />
  )
})
