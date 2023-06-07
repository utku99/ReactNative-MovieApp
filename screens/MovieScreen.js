import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window')

export default function MovieScreen() {
    const { params: item } = useRoute() //const item = props.route.params
    const navigation = useNavigation()
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        getMovieDetials(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item]);

    const getMovieDetials = async (id) => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data) //{ ...movie, ...data }
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if (data && data.cast) {
            setCast(data.cast)
            setLoading(false)
        }
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
    }

    return (
        <ScrollView className="flex-1 bg-neutral-900">

            <View>
                <SafeAreaView className="absolute z-20 px-4">
                    <TouchableOpacity className="rounded-xl p-1 bg-yellow-400" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image
                        source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                        style={{ width, height: height * 0.55 }} />
                    <LinearGradient
                        colors={['transparent', 'rgba(23, 23, 23, 0.9)', 'rgba(23, 23, 23, 1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0" />
                </View>
            </View>

            <View className="space-y-3 -mt-20">

                <Text className="text-white text-center text-3xl font-bold tracking-widest">{movie?.title}</Text>

                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} dk
                        </Text>
                    ) : null
                }

                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wide">{movie?.overview}</Text>
            </View>

            {
                loading ?
                    (
                        <Loading />
                    ) : (
                        <>

                            {
                                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
                            }

                            {
                                movie?.id && similarMovies.length > 0 && <MovieList title='Benzer Filmler' data={similarMovies} />
                            }

                        </>)
            }
        </ScrollView>
    )
}