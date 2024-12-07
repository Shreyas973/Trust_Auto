import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { collection,getDocs } from 'firebase/firestore'
import Colors  from './../../constants/Colors';
import {db} from './../../config/FireBaseConfig'
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MarkFav from './../../components/MarkFav';


export default function VehicleListitem({Vehicles}) {
    const router=useRouter();
  return (
    <View style={{
        paddingTop:20
    }}>
    <TouchableOpacity 
    onPress={()=>router.push({
        pathname:'vehicle-details',
        params:Vehicles
    })}
    style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
        <View style={{
            position:'absolute',
            zIndex:10,
            right:10,
            top:10,
        }}>
            <MarkFav Vehicles={Vehicles}/>
        </View>
        <Image source={{uri:Vehicles?.imageUrl}}
        style={{
            width:150,
            height:135,
            borderRadius:10
        }}
       
    />
    <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'}}
            >
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:18
    }}>{Vehicles?.Name}</Text>
    </View>

        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <Text style={{
                color:Colors.GRAY,
                fontFamily:'outfit'
            }}>{Vehicles?.Model}</Text>
            <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'}}
            >
            <Text style={{
                fontFamily:'outfit',
                color:Colors.PRIMARY,
                paddingHorizontal:2,
                borderRadius:99
            }}>{Vehicles?.Price}</Text>
            </View>
        </View>
    
    </TouchableOpacity>
    </View>
  )
}