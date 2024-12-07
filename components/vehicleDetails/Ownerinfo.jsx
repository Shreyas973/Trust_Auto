import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function Ownerinfo({Vehicles}) {
  return (
    <View style={{
        marginHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        borderWidth:1,
        borderRadius:15,
        padding:10,
        backgroundColor:Colors.WHITE,
        justifyContent:'space-between'
    }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            gap:10
        }}>
    <Image source={{uri:Vehicles?.userImage}}
      style={{
          width:50,
          height:50,
          borderRadius:99
      }}
      /> 
      <View>
      <Text style={{
        fontSize:17,paddingLeft:10
        }}>{Vehicles?.username}</Text>
          <Text style={{
              color:Colors.GRAY,
              fontFamily:'outfit',
              fontSize:16,
              padding:10
          }}>Owner</Text>
          </View>
          </View>
          <EvilIcons name="sc-telegram" size={50} color="black" style={{
            paddingBottom:25
          }} />
         </View>

  )
}