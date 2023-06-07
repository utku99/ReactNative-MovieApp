import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../api/moviedb'

var { width, height } = Dimensions.get('window')

export default function TrendingMovies({ data }) {

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-4">Trendler</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => (<MovieCard item={item} />)}
                firstItem={0}
                loop={true}
                inactiveSlideScale={0.8}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                itemWidth={width * 0.6}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}

const MovieCard = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie', item)}>
            <Image source={{ uri: image500(item.poster_path) }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className="rounded-3xl" />
        </TouchableWithoutFeedback>
    )
}