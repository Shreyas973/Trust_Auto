import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from './../../components/MarkFav'
import { db } from '../../config/FireBaseConfig'
export default function Vehicleinfo({Vehicles}) {
  return (
    <View>
<Image source={{uri:Vehicles.imageUl}}
style={{
    paddingLeft:10,
    width:'100%',
    height:350,
    objectFit:'cover'
}}/>
<View style={{
    padding:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
}}>
    <View>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:27
        }}>{Vehicles?.Name}  ({Vehicles?.Model})</Text>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:27,
            color:Colors.GRAY}}>{Vehicles?.Price}</Text>
    </View>
    <MarkFav Vehicles={Vehicles}/>
</View>
</View>
  )
}