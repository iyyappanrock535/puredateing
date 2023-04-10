import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect ,useContext, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity,Button, Image,ImageBackground, TouchableOpacityBase ,ToastAndroid} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";


import { TextInput } from 'react-native-gesture-handler';



const Reset = () => {
    // const { signInWithGoogle, loading } = useAuth();
    const [email, setEmail] = useState();
   
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const forgotPassword =  () => {
      console.log("We reached here")
      console.log(email)
      const auth = getAuth();
     
      sendPasswordResetEmail(auth, email);
      ToastAndroid.show('Check your email to reset password', ToastAndroid.SHORT);
      navigation.navigate("signup");
      }
  
               
    return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.outerview}>
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
         
        </View>

          <TouchableOpacity
            onPress={forgotPassword}
              style = {styles.signB}
            
              >
              <Text style = {styles.btxt} > Reset</Text>
          </TouchableOpacity>
            {/* <Button title="Reset" onPress={signInWithGoogle}/> */}

      
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

export default Reset;