import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import {Link} from "expo-router"
import Colors from "./../../constants/Colors"
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <ScrollView style={{
        backgroundColor:Colors.WHITE,
        height:"100%"
    }}>
      <Image source={require('./../../assets/images/trust.png')}
      style={{
        width:'100%',
        height:440
      }}
      />
      <View style={{
        padding:20,
        display:'flex',
        alignItems:'center'
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,
            alignItems:'center',
            paddingTop:14
        }}>Ready to make a new friend?</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:18,
            alignItems:'center',
            color:Colors.GRAY
        }}>Let's adopt the which you like and make your life happy again</Text>

        <Pressable onPress={onPress}
        style={{
            padding:14,
            marginTop:100,
            backgroundColor:Colors.PRIMARY,
            width:'100%',
            borderRadius:14
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,
                textAlign:'center'
            }}>Get Started</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}