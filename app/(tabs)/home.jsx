import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import VehiclesListByCategory from '../../components/Home/VehicleListByCategory'
import VehicleListByCategory from '../../components/Home/VehicleListByCategory'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import VehicleListitem from '../../components/Home/VehicleListitem'
import { storage } from '../../config/FireBaseConfig'
import { db } from '../../config/FireBaseConfig'
export default function Home() {
  return (
    <ScrollView>
    <View style={{
      padding:20,marginTop:20
    }}>
      {/* Header */}
      <Header/>

      {/* Slider */}
      <Slider/>

      {/*category*/}
      <VehicleListByCategory/>

      {/*add new vehicle option*/}

     
    </View>
    </ScrollView>
  )
}