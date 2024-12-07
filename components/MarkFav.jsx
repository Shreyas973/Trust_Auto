import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import Colors from '../constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Shared from '../Shared/Shared';

export default function MarkFav({Vehicles}) {
    const {user}=useUser();
    const [favList,setFavList]=useState();
    useEffect(()=>{
        user&&GetFav();

    },[user])

    const GetFav=async()=>{
       const result=await Shared.GetFavList(user)
       console.log(result);
       setFavList(result.favorites?result?.favorites:[])
    }
    const AddToFav=async()=>{
      const favResult=favList;
      favResult.push(Vehicles?.id)
      await Shared.updateFav(user,favResult)
      GetFav();
    }
    const removeFromFav=async()=>{
      const favResult=favList.filter(item=>item!=Vehicles.id);
      await Shared.updateFav(user,favResult)
      GetFav();
    }
  return (
    <View>
      {favList?.includes(Vehicles.id)?
    < Pressable onPress={removeFromFav}>
<AntDesign name="heart" size={30} color="red" />
    </Pressable>:
    < Pressable onPress={()=>AddToFav()}>
<Entypo name="heart-outlined" size={30} color="black" />
    </Pressable>}
    </View>
  )
}