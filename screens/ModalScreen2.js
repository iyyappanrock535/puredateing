import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from 'react';
import {TextInput, View, Text, StyleSheet, Image,TouchableOpacity, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

// import { TouchableOpacity } from "react-native-gesture-handler";
import NumericInput from 'react-native-numeric-input'
import { db } from "../firebase";
import { RadioButton } from 'react-native-paper';

const ModalScreen2 = () => {
 console.log('ModalScreen2ModalScreen2',);
  const { user } = useAuth();  
  const [age, setAge] = useState(null);
  const [dname, setDname] = useState(null);

  const [hobby1, setHobby1] = useState(null)
  const [hobby2, setHobby2] = useState(null)
  const [city, setCity] = useState(null)
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [encodedUri, baseEncoded] = useState('');
  const [checked, setChecked] = React.useState('first');
  // Gender 
  const gender = [
    {
      key: 'male',
      text: 'Male',
    },
    {
      key: 'female',
      text: 'Female',
    },
   
  ];

 
  // const firebase = require("firebase/firestore");
  const incompleteForm =  !hobby1 || !hobby2 || !city || !checked || !dname  ;


  const updateUserProfile = () => {

    ToastAndroid.show('Please wait...', ToastAndroid.SHORT);

    setDoc(doc(db,'users',user.uid),{
      id : user.uid,
      displayName : user.displayName,
      age : age,
      hobby1 : hobby1,
      hobby2 : hobby2,
      city : city,
      profileUrl : encodedUri,
      intrested : checked,
      displayName : dname,
      timestamp : serverTimestamp()
    }).then(() =>{
      navigation.navigate('Home');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  // Open image gallery and select the Image
  const pickImage = async () => {
    console.log('test 3');
    const {
      status,
  } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status == "granted") {
    console.log('test 4');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    

    if (!result.cancelled) {
      
      console.log("Reached here");
      
        
        const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        console.log(base64);
        baseEncoded(base64);
    }
  }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ==="ios" ? "padding" : "height"}
      style={tw("flex-1")}
      keyboardVerticalOffset={10}
      >
    <ScrollView >

    <SafeAreaView
    style={tw("flex-1 items-center pt-2")}
    >
      <Image
       style={tw("h-10 w-full")}
       resizeMode="contain"
       source={ require('../assets/purehq.png')}
      />



      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 1 : Select Profile
      </Text>
     <Text style={tw("text-center p-1 font-bold ")}>
     [NOTE: Image size should be less than 1.8MB]
     </Text>
      <Text
          onPress={pickImage} 
          style={tw("text-center text-blue-400  font-bold")}
          >Choose picture.. </Text>

      <View>
         <Image source={{uri:`data:image/jpeg;base64,${encodedUri}`}} style={styles.image} />
      </View>
      
      <Text  style={tw("text-center text-red-400 p-4 font-bold")}>
                Step 2: Your Name 
            </Text>
            <TextInput
            value = {dname}
            onChangeText={text => setDname(text)}
            style={tw("text-center text-xl pb-2")}
            placeholder = "Name"
            />
    
      
      <View>
      <Text  style={tw("text-center text-red-400 p-4 font-bold")}>
                Step 3: Looking for 
     </Text>
   
      <RadioButton.Group  onValueChange={checked => setChecked(checked)} value={checked}>
      <RadioButton.Item label="Male" value="male" />
      <RadioButton.Item label="Female" value="female" />
    </RadioButton.Group>
    
    </View>
      <Text  style={tw("text-center text-red-400 p-4 font-bold")}>
                Step 4: Your Hobby 
            </Text>
            <TextInput
            value = {hobby1}
            onChangeText={text => setHobby1(text)}
            style={tw("tect-center text-xl pb-2")}
            placeholder = "Hobby 1"
            />
            <TextInput
            value = {hobby2}
            onChangeText={text => setHobby2(text)}
            style={tw("tect-center text-xl pb-2")}
            placeholder = "Hobby 2"
            />
        
           

      <Text  style={tw("text-center text-red-400 p-4 font-bold")}>
                Step 5: Your Age
            </Text>
            
            
            <NumericInput
            style={styles.ninput}
            value = {age}
            // onChangeText={ setAge(value)}
            
            rounded 
            totalWidth={100} 
            iconSize={5}
            totalHeight={40}
            valueType='real'
            textColor='black' 
            maxValue={100}
            minValue={18}
            
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#E56B70' 
            leftButtonBackgroundColor='#E56B70'
            onChange={value => setAge(value)}>
              </NumericInput>
            
             <Text  style={tw("text-center text-red-400 p-4 font-bold")}>
                Step 6: Your city
            </Text>
             
            <TextInput
            value = {city}
            onChangeText={text => setCity(text)}
            style={tw("tect-center text-xl pb-2")}
            placeholder = "Enter your City"
            />
         
        
          <TouchableOpacity
          disabled={incompleteForm}
          style={[tw('w-60 p-3 rounded-xl center top-5 bottom-0 '),
            incompleteForm ? tw('bg-red-200') : tw('bg-red-400')
          ]}
          onPress = {updateUserProfile}>
        
                  <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
                  
          </TouchableOpacity> 
          <TouchableOpacity
          disabled={incompleteForm}
          
          onPress = {updateUserProfile}>
        
                  <Text style={tw("text-center text-white text-xl")}></Text>
                  
          </TouchableOpacity> 
       </SafeAreaView>
       </ScrollView>
       </KeyboardAvoidingView>
    
  );
}

export default ModalScreen2
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      width: 200,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    ninput :{
      alignItems: 'center',
      alignSelf : 'center'
      
    },
    imageContainer: {
      padding: 30,
    marginTop : 100
      
    },
    scrollView: {
     
      alignContent:"center",
      // alignItems :"center",
    },
    image: {
      width: 50,
      height: 50,
      resizeMode: 'cover'
    }
  });