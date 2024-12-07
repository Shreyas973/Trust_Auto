import { View, Text, Image, TextInput, StyleSheet, ScrollView, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {  getDocs, setDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import Category from '../../components/Home/Category';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { storage } from '../../config/FireBaseConfig';
import { ref } from 'firebase/storage';
import { doc } from 'firebase/firestore';

export default function SellVehicle() {
  const navigation=useNavigation();
  const [formData,setFormData]=useState(
    {Category:'Bike'}
  );
  const [categoryList,setCategoryList]=useState([]);
  const [SelectedCategory,setSelectedCategory]=useState();
  const [image,setImage]=useState();
  const {user}=useUser();
  const [loader,setLoader]=useState(false);
  const router=useRouter();
  useEffect(()=>{
    navigation.setOptions({headerTitle:'SELL YOUR VEHICLE'})
    GetCategories();
  },[])

  const GetCategories=async()=>{
    setCategoryList([]);
    const snapshot=await getDocs(collection(db,'Category'));
    snapshot.forEach((doc)=>{
        setCategoryList(categoryList=>[...categoryList,doc.data()])    
        })
}

const imagePicker=async()=>
{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 5],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }

}
  const handleInputChange=(fieldName,fieldValue)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue,
    }))
  }

  const onSubmit=()=>{
    if(Object.keys(formData).length!=8){
      ToastAndroid.show('Fill All Field',ToastAndroid.SHORT)
      return;
    }
    UploadImage();

  }

  /*upload image to firebase storage

  */
  const UploadImage=async()=>
  {
    setLoader(true);
    const resp=await fetch(image);
    const blobImage=await resp.blob();
    const storageRef=ref(storage,'/Vehicles/'+Date.now()+'.jpg')
    uploadBytes(storageRef,blobImage).then((snapshot)=>{
      console.log('file uploaded')
    }).then(resp=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>
      {
        console.log(downloadUrl);
        SaveFormData(downloadUrl)
      })
    })

  }

  const SaveFormData=async(imageUrl)=>{
    const docId=Date.now().toString();
    await setDoc(doc(db,'Vehicles',docId),{
      ...formData,
      imageUrl:imageUrl,
      username:user?.fullName,
      email:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      id:docId
    })
    setLoader(false);
  router.replace('/(tabs)/home')

  }
  return (
    <ScrollView style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>Sell Vehicle</Text>
      <Pressable onPress={imagePicker}>
      {!image?<Image source ={require('./../../assets/images/placeholder.png')}
      style={{
        width:100,
        height:100,
        borderRadius:15,
        borderWidth:1,
        borderColor:Colors.PRIMARY
      }}
      />:<Image source={{uri:image}} style={{
        width:100,
        height:100,
        borderRadius:15,
        borderWidth:1,
        borderColor:Colors.PRIMARY}}
        />}
      </Pressable>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Name *</Text>
        <TextInput style={styles.input} placeholder='Vehicle Name'onChangeText={(value)=>handleInputChange('Name',value)}/>

      </View>
<View style={styles.inputContainer}>
  <Text style={styles.label}>Vehicle Category *</Text>
      <Picker
  selectedValue={SelectedCategory}
  style={styles.input}
  onValueChange={(itemValue, itemIndex) =>{
    setSelectedCategory(itemValue);
    handleInputChange('Category',itemValue)
  }
  }>
    {categoryList.map((Category,index)=>(
  <Picker.Item key={index} label={Category.Name} value={Category.Name}/>

    ))}
</Picker>
</View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Model *</Text>
        <TextInput style={styles.input} placeholder='Vehicle Model'
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('Model',value)}/>

      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Mileage *</Text>
        <TextInput style={styles.input} placeholder='Vehicle Mileage'
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('Mileage',value)}/>

      </View>

    

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Price *</Text>
        <TextInput style={styles.input} placeholder='Vehicle Price'
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('Price',value)}/>

      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location *</Text>
        <TextInput style={styles.input} placeholder='Owner Location'onChangeText={(value)=>handleInputChange('Location',value)}/>

      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Posting Date(DD-MM-YYY) *</Text>
        <TextInput style={styles.input} placeholder='Posting Date'
        keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('postdate',value)}/>

      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={styles.input} numberOfLines={5} multiline={true}
        placeholder=''onChangeText={(value)=>handleInputChange('Description',value)}/>

      </View>

      <TouchableOpacity  disabled={loader}
      onPress={onSubmit} 
      style={{
        padding:15,
        backgroundColor:'#005533',
        borderRadius:7,
        marginVertical:10,
        marginBottom:50
      }}>
      {loader?<ActivityIndicator size={'large'}/>:
        <Text style={{
          fontFamily:'outfit-medium',
          textAlign:'center'
        }}>Submit</Text>
      }
      </TouchableOpacity>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  inputContainer:{
    marginVertical:5
  },
  input:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderRadius:7
  },
  label:{
    marginVertical:5,
    fontFamily:'outfit'
  }
})