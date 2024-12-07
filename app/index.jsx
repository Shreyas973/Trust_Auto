import { Redirect, useRootNavigationState} from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import {View, Text, Image} from "react-native";
import { ClerkLoaded } from "@clerk/clerk-expo";


export default function Index() {
  const {user,isLoaded}=useUser();
  const rootNavigationState=useRootNavigationState();
  useEffect(()=>{
   
    if(!rootNavigationState.key){
    }
  },[rootNavigationState.key]);
  if(!isLoaded){
    return<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>  
    <Image source={require('./../assets/images/trust.png')}
    style={{
      width:'100%',
      height:'100%'
    }}
    /></View>;
  }
  return (
    <View style={{flex:1}}>
    {user?
      <Redirect href={'/(tabs)/home'}/> : <Redirect href={'/login'}/>}
    </View>
  );
}
