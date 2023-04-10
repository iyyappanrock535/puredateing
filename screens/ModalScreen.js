import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from 'react';
import {TextInput, View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView, ToastAndroid,TouchableOpacity,SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

// import { TouchableOpacity } from "react-native-gesture-handler";
import NumericInput from 'react-native-numeric-input'
import { db } from "../firebase";
import { RadioButton } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome,Ionicons } from '@expo/vector-icons'; 
import RadioGroup from 'react-native-radio-buttons-group';
import { useEffect } from "react";

const ModalScreen = () => {
  console.log('ModalScreen1ModalScreen1',);
  const { user } = useAuth();  
  const [age, setAge] = useState(null);
  const [dname, setDname] = useState(null);
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'male',
    borderColor:'#f87171',
    labelStyle:{fontSize:15}
}, {
    id: '2',
    label: 'Female',
    value: 'female',
    borderColor:"#f87171",
    labelStyle:{fontSize:15}
}]
  const [hobby1, setHobby1] = useState(null)
  const [hobby2, setHobby2] = useState(null)
  const [city, setCity] = useState(null)
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [encodedUri, baseEncoded] = useState('');
  const [checked, setChecked] = React.useState('first');
  const [spinnerLoading, setspinnerLoading] = useState(false)
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

  useEffect(() => {
   
    apiCall()

  }, [])
  
  async function apiCall(){
    const {
      status,
  } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
      alert(
          "Sorry, we need camera roll permissions to make this work!"
      );
      const {
          status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  }
  }
  // const firebase = require("firebase/firestore");
  const incompleteForm =  !hobby1 || !hobby2 || !city || !checked || !dname  ;


  const updateUserProfile = () => {

    ToastAndroid.show('Please wait...', ToastAndroid.SHORT);
    setspinnerLoading(true)
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
      setspinnerLoading(false)
      navigation.navigate('Home');
    })
    .catch((error) => {
      setspinnerLoading(false)
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
        // res = result.uri;
        // setPickedImagePath(result.uri);
        
        const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        console.log(base64);
        baseEncoded(base64);
    }
  }
    
  };


  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    
  useEffect(() => {
    radioButtonsData[0].selected = true;
    setChecked('male')
    setTimeout(() => {
      console.log(radioButtonsData);
      setRadioButtons([...radioButtonsData]);
    }, 1000)
  }, []);

  function onPressRadioButton(radioButtonsArray) {
    console.log('radioButtonsArrayradioButtonsArray',radioButtonsArray);
      setRadioButtons(radioButtonsArray);
      radioButtonsArray.map((v,i)=>{
        if(v?.selected==true){
          setChecked(v?.value)
        }
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ==="ios" ? "padding" : "height"}
      style={tw("flex-1")}
      keyboardVerticalOffset={10}
      >
    <ScrollView style={{paddingLeft:responsiveWidth(6)}} >

    <SafeAreaView
    // style={tw("flex-1  pt-3 pl-5")}
    // style={{paddingLeft:23,flex:1,padding:responsiveWidth(55)}}
    >
       <Spinner
          visible={spinnerLoading}
          textContent={'Loading...'}
          // textStyle={styles.spinnerTextStyle}
        />
      <Image
       style={tw("h-10 w-full")}
       resizeMode="contain"
       source={ require('../assets/purehq.png')}
      />



      <Text style={tw("text-xl text-gray-500 p-2 font-bold text-center")}>
        Welcome {user.displayName}
      </Text>
     
      {/* <Text style={tw("text-center p-4 font-bold text-red-400")}>
       Select Profile
      </Text> */}
     <View style={{alignItems:'center'}}>
     <TouchableOpacity onPress={()=>pickImage()}
      style={{ borderWidth:2,width:83,height:83,borderRadius:40,borderColor:'#f87171'}}
      >
     {encodedUri? <Image   source={{uri:`data:image/jpeg;base64,${encodedUri}`}} style={{width:78,height:78,borderRadius:40,justifyContent:'center',alignItems:'center',}} />:
      <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
        <FontAwesome  name="user" size={54} color="black" />
      </View>}
     
      </TouchableOpacity>
      <View style={{position:'absolute',marginTop:responsiveHeight(6)}}>
      <Ionicons name="add-circle" style={{marginLeft:responsiveWidth(17)}} size={27} color="#f87171" />
      </View>
     <Text style={{fontSize:11,fontWeight:'bold'}}>
     [NOTE: Image size should be less than 1.8MB]
     </Text>
     </View>
      {/* <Text
          onPress={pickImage} 
          style={tw("text-center text-blue-400  font-bold")}
          >Choose picture.. </Text> */}


      {/* <View>
         <Image source={{uri:`data:image/jpeg;base64,${encodedUri}`}} style={styles.image} />
      </View> */}
      
     <View style={{alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}}>
    <View style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
    <Text   style={tw("text-center text-red-400 mt-3 mb-3 font-bold")}>
          Your Name 
            </Text>
            <TextInput
            value = {dname}
            onChangeText={text => setDname(text)}
            // style={tw("tect-center text-xl pb-2")}
            style={styles.FormControl}
            placeholder = "Name"
            />
    </View>
    
      
      <View>
      <Text  style={tw("text-left text-red-400 mt-4 mb-4 font-bold")}>
              Looking for 
     </Text>
   
   <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
   <RadioGroup 
    containerStyle={{justifyContent:'flex-start',color:'red',alignItems:'flex-start',marginLeft:-10}}
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />
   </View>
      {/* <RadioButton.Group  onValueChange={checked => setChecked(checked)} value={checked}>
      <View >
        <Text>First</Text>
      <RadioButton color="blue" value="male" />
      </View>
      <View>
        <Text>First</Text>
      <RadioButton color="blue" value="female" />
      </View>
    </RadioButton.Group>
     */}
    </View>
      <Text  style={tw("text-center text-red-400 mt-4 mb-4  font-bold")}>
          Your Hobby 
            </Text>
            <TextInput
            value = {hobby1}
            onChangeText={text => setHobby1(text)}
            style={[styles.FormControl,{marginBottom:5}]}
            placeholder = "Hobby 1"
            />
            <TextInput
            value = {hobby2}
            onChangeText={text => setHobby2(text)}
            style={styles.FormControl}
            placeholder = "Hobby 2"
            />
        
           

      <Text  style={tw("text-center text-red-400 mt-4 mb-4 font-bold")}>
              Your Age
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
            
             <Text  style={tw("text-center text-red-400 mt-4 mb-4 font-bold")}>
               Your city
            </Text>
             
            <TextInput
            value = {city}
            onChangeText={text => setCity(text)}
            style={styles.FormControl}
            placeholder = "Enter your City"
            />
         
     </View>
        
          <TouchableOpacity
          disabled={incompleteForm}
          style={[tw('w-60 p-3 rounded-xl center top-5 bottom-0 ml-12 '),
            incompleteForm ? tw('bg-red-200') : tw('bg-red-400'),{
              marginBottom:responsiveHeight(8)
            }
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

export default ModalScreen
const styles = StyleSheet.create({
  FormControl: {
    width:responsiveWidth(88),
		height: 50,
		borderWidth: 1,
		padding: 15,
		borderColor: '#d4d4d4',
		borderRadius: 5,
		color: '#131234',
		fontSize: responsiveFontSize(2),
		// fontFamily: 'MontserratMedium'
	},
  headerTitle:{
textAlign:'left'
  },
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