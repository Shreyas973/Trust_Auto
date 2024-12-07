import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, query } from 'firebase/firestore';
import VehicleListitem from './../../components/Home/VehicleListitem';
import { db } from '../../config/FireBaseConfig';
import { where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import Shared from './../../Shared/Shared';


export default function Favorite() {

const {user}=useUser();
const [favIds,setFavIds]=useState([]);
const [favVehicleList,setFavVehicleList]=useState([]);
const [loader,setLoader]=useState(false)
  //Fav ids
useEffect(()=>{
  user&&GetFavIds();
},[user])



  const GetFavIds=async()=>{
    setLoader(true);
    const result=await Shared.GetFavList(user);
    setFavIds(result?.favorites || []);
    setLoader(false);
    GetFavVehicleList(result?.favorites || []);

  }

  const GetFavVehicleList=async(favIds)=>{
    setLoader(true);
    setFavVehicleList([])
    if (favIds.length === 0) {
      console.log("No favorite product IDs.");
      return; // Exit early if favIds is empty
    }
    const q=query(collection(db,'Vehicles'),where('id','in',favIds));
    const querySnapshot= await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setFavVehicleList(prev=>[...prev,doc.data()])
    })
    setLoader(false);
  };
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Favorite</Text>
      <FlatList
        data={favVehicleList}
        numColumns={2}
        onRefresh={GetFavIds}
        refreshing={loader}
        renderItem={({item,index})=>(
          <View>
            <VehicleListitem Vehicles={item}/>
          </View>
        )}
      />
    </View>
  );
}