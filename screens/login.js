import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect ,useContext, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity,Button, Image,ImageBackground, TouchableOpacityBase } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import Swiper from 'react-native-deck-swiper';
import { TextInput } from 'react-native-gesture-handler';
const login = () => {
    const { signInWithGoogle, loading } = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
               
    return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.outerview}>
        <ImageBackground 
        style={styles.tinyLogo}
        source={ require('../assets/LOGOM.png')
          }/>

          <TextInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          >

          </TextInput>
          <TextInput
          labelValue={password}
          onChangeText={(password) => setPassword(password)}

            placeholderText="Password"

          ></TextInput>
          
       
          <TouchableOpacity
            onPress={signInWithGoogle}
              style = {styles.signB}
            //   ,[
            //       tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
            //       margin = '10',
                  
            //   ]}
              >
              <Text style = {styles.btxt} > Sign in & share love</Text>
          </TouchableOpacity>
            {/* <Button title="login" onPress={signInWithGoogle}/> */}

      
      </View>
    </SafeAreaView>
    
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems :"center",
      justifyContent:"center",
  
    },
    outerview: {
      width:250,
      height:250,
      
    },
    tinyLogo: {
      width:250,
      height:250,
    },
    signB:{
        marginTop: '10%',
        elevation: 8,
        backgroundColor: "#FF5864",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        // tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),

    },
    btxt :{
        
        textAlign :"center",
        color: "white",
        fontSize: 20,
        // fontFamily: "Cochin",
        alignItems :"center",
        justifyContent:"center",

    }
 
  });

export default login;