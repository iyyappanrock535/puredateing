import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, ToastAndroid,TextInput, TouchableOpacity, View,Image, Alert } from 'react-native'
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import { auth } from '../firebase';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


const Signup = () => {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = () => {
    // ToastAndroid.show('Please wait...', ToastAndroid.SHORT);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }


  const handleLogin = () => {
    // ToastAndroid.show('Please wait...', ToastAndroid.SHORT);

    const auth = getAuth();
    console.log('sadjjasbdbasbdnas',email,auth)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
       Alert.alert('Error','User not found. Please register')
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  


  return (
    
      <SafeAreaView style={styles.container}>

      <View style={styles.inputContainer}>
      <View >
  <Image resizeMode="contain" style={{width:responsiveWidth(44),height:responsiveHeight(24),marginLeft:responsiveWidth(18)}} source={require('../assets/LOGOM.png')} />
</View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
         onPress={() => navigation.navigate('rst')}
        >
          <Text style={styles.buttonOutlineText1}>Forgot Password?</Text>
        </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button,tw('bg-red-400')]}
         
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleSignUp}
         onPress={() => navigation.navigate('register')}

          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
          
        </TouchableOpacity>
       
        {/* <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign in with Google</Text>
        </TouchableOpacity> */}
      </View>
      </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    // backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#ef5350',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText1: {
    color: 'red',
    fontWeight: '700',
    fontSize: 16,
    backgroundColor:'white'
  },
  buttonOutlineText: {
    color: '#ef5350',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText1: {
    color: '#ef5350',
    fontWeight: '700',
    fontSize: 12,
    marginTop : 5,
    textAlign: 'right',
  },
 
})