import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {db} from './../../config/FireBaseConfig'
import { FlatList } from 'react-native';
import Colors  from './../../constants/Colors';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function Category({category}) {
    const [categoryList,setCategoryList]=useState([]);
    const [SelectedCategory,setSelectedCategory]=useState('Bike');
    useEffect(()=>{
        GetCategories();
    },[])

    const GetCategories=async()=>{
        setCategoryList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            setCategoryList(categoryList=>[...categoryList,doc.data()])    
            })


    }
  return (
    <View style={{
        marginTop:20,
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Category</Text>
      <FlatList
      data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={()=>{setSelectedCategory(item.Name);
        category(item.Name)
        }}
         style={{
            flex:1
        }}>
            <View style={[styles.container,
                SelectedCategory==item.Name && styles.SelectedCategoryContainer]}>
                <Image source={{uri:item?.imageUrl}}
                style={{
                width:80,
                height:50,
            
                }}/>
            </View>
      <Text style={{
        textAlign:'center',
        fontFamily:'outfit',
        fontSize:12
      }}>{item?.Name}</Text>
      </TouchableOpacity>
    )} 
      />
  </View>
)
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        margin:5    },
    SelectedCategoryContainer:{
        backgroundColor:Colors.GRAY,
        borderColor:Colors.GRAY
    }

})