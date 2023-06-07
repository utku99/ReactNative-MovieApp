import { View, Text, TouchableWithoutFeedback, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb'

const { width, height } = Dimensions.get('window')

export default function MovieList({ title, data }) {
  const navigation = useNavigation()
  return (
    <View className="mb-8 space-y-4">

      <Text className="mx-4 text-white text-lg">{title}</Text>

      <FlatList //scrollview kullanıp data map edilerek de kullanılabilir
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
            <View className="space-y-1 mr-4">
              <Image
                source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                className="rounded-3xl"
                style={{ width: width * 0.3, height: height * 0.2 }}
              />
              <Text className="text-neutral-300 ml-1">
                {item.title?.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />

    </View>
  )
}