import { View, Text, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Vehiclesubinfo({Vehicles}) {
  return (
    <View style={{
        padding:20
    }}>
      
      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
         <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:3,
            flex:1

          }}>
          <View>
          <AntDesign name="medium-monogram" size={24} color="black"             
             style={{
                    width:40,
                    height:40
                }}
            />
            </View>
            <View>
              <Text style={{
                fontSize:18,
                fontFamily:'outfit',
              }}>Model</Text>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20
              }}>{Vehicles?.Model}</Text>
              </View>
          </View>
      
      

      <View style={{
            display:'flex',
            flexDirection:"row",
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:3,
            flex:1

          }}>
          <View>
          <Ionicons name="speedometer-outline" size={24} color="black" 
                   style={{
                    width:40,
                    height:40,
                }}
            />
            </View>
            <View>
              <Text style={{
                fontSize:18,
                fontFamily:'outfit',
              }}>Mileage</Text>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20
              }}>{Vehicles?.Mileage}</Text>
          </View>
          </View>
      </View>


      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
         <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:3,
            flex:1

          }}>
          <View>
          <Entypo name="location" size={24} color="black" 
                    style={{
                    width:40,
                    height:40
                }}
            />
            </View>
            <View>
              <Text style={{
                fontSize:18,
                fontFamily:'outfit',
              }}>Location</Text>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20
              }}>{Vehicles?.Location}</Text>
              </View>
          </View>
      
      

      <View style={{
            display:'flex',
            flexDirection:"row",
            alignItems:'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:3,
            flex:1

          }}>
          <View>
          <Fontisto name="date" size={24} color="black" 
                style={{
                    width:40,
                    height:40
                }}
            />
            </View>
            <View>
              <Text style={{
                fontSize:18,
                fontFamily:'outfit',
              }}>Posting date</Text>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:18
              }}>{Vehicles?.postdate}</Text>
          </View>
          </View>
      </View>
      
      </View>
  )
}