import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';


export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    if (data && data.results) setTrending(data.results)
    setLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    if (data && data.results) setUpcoming(data.results)
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    if (data && data.results) setTopRated(data.results)
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-800" >

      <StatusBar style="light" />

      <View className="flex-row justify-between items-center mx-4">
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
        <Text className="text-white text-3xl font-bold">
          <Text className="text-yellow-400">F</Text>ilmler
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View >

      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>

            {trending.length > 0 && <TrendingMovies data={trending} />}

            {upcoming.length > 0 && <MovieList title="Çıkmak Üzere" data={upcoming} />}

            {topRated.length > 0 && <MovieList title="En Çok Oylanan" data={topRated} />}

          </ScrollView>
        )
      }

    </SafeAreaView >
  )
}
