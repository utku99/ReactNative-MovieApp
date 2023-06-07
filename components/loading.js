import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

const {width, height} =  Dimensions.get('window') //Dimensions bir React Native modülüdür ve mobil cihazın ekran boyutunu pixel cinsinden verir.'window' boyutu, ekran boyutunu temsil eder.

export default function Loading() {
  return (
    <View style={{height : height, width: width}} className="absolute flex-row justify-center items-center bg-opacity-50">
        <Progress.CircleSnail thickness={12} size={160} color="yellow" />
    </View>
  )
}