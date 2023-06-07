import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/movieList'
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb'
import Loading from '../components/loading'

var { width, height } = Dimensions.get('window')

export default function PersonScreen() {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [person, setPerson] = useState({})
    const [personMovies, setPersonMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        setLoading(false)
        if (data) setPerson(data)
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        if (data && data.cast) setPersonMovies(data.cast)
    }

    return (
        <ScrollView
            className="flex-1 bg-neutral-900"
            contentContainerStyle={{ paddingBottom: 15 }}>

            <SafeAreaView>
                <TouchableOpacity className="rounded-xl p-1 bg-yellow-400 mx-4 w-9 items-center" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View className="m-auto rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                            <Image
                                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                style={{ height: height * 0.43, width: width * 0.74 }} />
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {person?.name}
                            </Text>
                            <Text className="text-neutral-500 text-base text-center">
                                {person?.place_of_birth}
                            </Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 pr-2 items-center">
                                <Text className="text-white font-semibold ">Cinsiyet</Text>
                                <Text className="text-neutral-300 text-sm">{person?.gender == 1 ? 'Female' : 'Male' || 'N/A'}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 pr-2 items-center">
                                <Text className="text-white font-semibold">Doğum Tarihi</Text>
                                <Text className="text-neutral-300 text-sm">{person?.birthday || 'N/A'}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 pr-2 items-center">
                                <Text className="text-white font-semibold">Meslek</Text>
                                <Text className="text-neutral-300 text-sm">{person?.known_for_department || 'N/A'}</Text>
                            </View>
                            <View className="pr-2 items-center">
                                <Text className="text-white font-semibold">Popülerlik</Text>
                                <Text className="text-neutral-300 text-sm">% {person?.popularity?.toFixed(1) || 'N/A'}</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biyografi</Text>
                            <Text className="text-neutral-400 tracking-wide">{person?.biography || 'N/A'}</Text>
                        </View>

                        {person?.id && personMovies.length > 0 && <MovieList title="Filmleri" hideSeeAll={true} data={personMovies} />}

                    </View>
                )
            }



        </ScrollView>

    )
}