import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import {db} from './../../config/FireBaseConfig'
import { collection, query ,getDocs,where, Query} from 'firebase/firestore'
import { FlatList } from 'react-native'
import VehicleListitem from './VehicleListitem'

export default function VehicleListByCategory() {
  const [VehicleList,setVehicleList]=useState([])
const [loader,setloader]=useState(false);
  useEffect(()=>{
    GetVehicleList('Bike')
  },[])
  const GetVehicleList=async(category)=>{
    setloader(true)
    setVehicleList([]);
    const q=query(collection(db,'Vehicles'),where('Category','==',category));
    const querySnapshot =await getDocs(q);

    querySnapshot.forEach(doc=>{
      setVehicleList(VehicleList=>[...VehicleList,doc.data()]);
    });
    setloader(false);
  }
  return (
    <View>
<Category category={(value)=>GetVehicleList(value)}/>
  <FlatList
  data={VehicleList}
  style={{marginTop:10  }}
  refreshing={loader}
  onRefresh={(loader=>GetVehicleList('Bike'))}
  numColumns={2}
  renderItem={({item,index})=>(
    <VehicleListitem Vehicles={item}/>
  )}/>
    </View>
  )
}