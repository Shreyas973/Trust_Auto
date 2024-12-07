import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Vehicleinfo from '../../components/vehicleDetails/vehicleinfo';
import Vehiclesubinfo from '../../components/vehicleDetails/vehiclesubinfo';
import About from '../../components/vehicleDetails/About';
import Ownerinfo from '../../components/vehicleDetails/Ownerinfo';
import { TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';

export default function VehicleDetails() {
  const Vehicles=useLocalSearchParams();
  const navigation=useNavigation();
  const {user}=useUser();
  const router=useRouter();

  useEffect(()=>{
    navigation.setOptions({
    headerTransparent:true,
    headerTitle:''
    })
  },[])

  const InitiateChat=async()=>{
    const docId1=user?.primaryEmailAddress?.emailAddress+'_'+Vehicles?.email;
    const docId2=Vehicles?.email+'_'+user?.primaryEmailAddress?.emailAddress;

    const q=query(collection(db,'Chat'),where('id','in',[docId1,docId2]));
    const querySnaphot=await getDocs(q)
    querySnaphot.forEach(doc=>{
      router.push({
        pathname:'/chat',
        params:{id:doc.id}
      })
    })
    if(querySnaphot.docs?.length==0){
      await setDoc(doc(db,'Chat',docId1),{
        id:docId1,
        users:[
          {
            email:user?.primaryEmailAddress?.emailAddress,
            imageUrl:user?.imageUrl,
            name:user?.fullName
          },
          {
            email:Vehicles?.email,
            imageUrl:Vehicles?.userImage,
            name:Vehicles?.username
          }
        ],
        userIds:[user?.primaryEmailAddress?.emailAddress,Vehicles?.email]
      });
      router.push({
        pathname:'/chat',
        params:{id:docId1}
     } )
    }

  }
  return (
    <View>
      <ScrollView>
      {/*Vehicle info*/}
      <Vehicleinfo Vehicles={Vehicles}/>
      <Vehiclesubinfo Vehicles={Vehicles}/>
      <About Vehicles={Vehicles}/>
      <Ownerinfo Vehicles={Vehicles}/>
      <View style={{height:70}}>

      </View>
      </ScrollView>
      <View style={{
        position:'absolute',
        width:'100%',
        bottom:0
        
      }}>
        <TouchableOpacity  onPress={InitiateChat}style={{
          padding:20,
          backgroundColor:Colors.PRIMARY
        }}>
          <Text style={{
            textAlign:'center',
            fontFamily:'outfit-bold',
            fontSize:20
          }}>Buy Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}