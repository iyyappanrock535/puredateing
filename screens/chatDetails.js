
import React, { useEffect, useState } from 'react';
// import React from 'react'
import { View, Text, KeyboardAvoidingView, FlatList, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Header  from '../components/Header';
import tw from 'tailwind-rn';
import {  getFirestore, updateDoc, doc, arrayUnion, arrayRemove, addDoc, collection, serverTimestamp, query, where, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    TextInput,
  } from 'react-native-paper';

const MessageDetailsScreen = (props) => {
    const navigation = useNavigation();
   const [matchDetails, setmatchDetails] = useState(props.route.params.matchDetails)
console.log('a,dfklnasnfmamslfasmldmasmf',props);
const [currentUserDetails, setcurrentUserDetails] = useState({})
console.log('getAuth().currentUser',getAuth().currentUser);
const [inputVal, setInputVal] = useState('test');
const [isDialogVisible, setIsDialogVisible] = useState(false);
const getuserBlockId =()=>{
    const userId = getAuth().currentUser.uid;
   
   return matchDetails.userMatched.filter(user=>userId!=user)[0]

}

useEffect(() => {
    getCureentUserDetails()
}, [])

const getCureentUserDetails =async()=>{
    const userId = getAuth().currentUser.uid;
    const userRef = doc(getFirestore(), 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Do something with userData
      setcurrentUserDetails(userData)
}
}
// Block a user
function blockUser(blockedUserId) {
    let userBlockId = getuserBlockId()
    console.log('userBlockIduserBlockIduserBlockId',userBlockId);
    const userId = getAuth().currentUser.uid;
    const userRef = doc(getFirestore(), 'users', userId);
    updateDoc(userRef, {
      blockedUsers: arrayUnion(userBlockId)
    });
    console.log('asmdnasm dm asm dmas','final out put');
    setTimeout(() => {
        navigation.navigate('Chat')
    }, 1000);
  }
  
  // Unblock a user
  function unblockUser(blockedUserId) {
    const userId = getAuth().currentUser.uid;
    let userBlockId = getuserBlockId()
    const userRef = doc(getFirestore(), 'users', userId);
    updateDoc(userRef, {
      blockedUsers: arrayRemove(userBlockId)
    });
    setTimeout(() => {
        navigation.navigate('Chat')
    }, 1000);
  }
  
  // Report a user
  function reportUser(reportReason) {
    setIsDialogVisible(false)
    const userId = getAuth().currentUser.uid;
    let userBlockId = getuserBlockId()
    const reportedUsersRef = collection(getFirestore(), 'reportedUsers');
    addDoc(reportedUsersRef, {
      reporterId: userId,
      reportedUserId: userBlockId,
      reason: reportReason,
      timestamp: serverTimestamp()
    });
    setTimeout(() => {
        navigation.navigate('Chat')
    }, 1000);
  }
  
  
  const confirModal =(type)=>{
    Alert.alert(
        'Confirm',
        `Are you to ${type}`,
        [
          {
            text: 'Okay',
            onPress: () =>{type=='Block'?blockUser():unblockUser()},
            style: 'default',
          },
          {
            text: 'Cancel',
           
            style: 'cancel',
          },
        ],
        
      );
    
  }
  
  
const getBlockDetailsCondition =(details)=>{
let a = getuserBlockId()
    if(_.get(details,'id') && _.includes(_.get(details,'blockedUsers'),a)==true){
        return true
    }else{
        return false;
    }

}
   
    return (
        <SafeAreaView style={tw("flex-1")}>
            <Header
           
            type={''}
             title={'Chat Details'} 
             callEnabled
              />
<Provider>
            <KeyboardAvoidingView
            behavior={Platform.OS ==="ios" ? "padding" : "height"}
            style={tw("flex-1")}
            keyboardVerticalOffset={10}
            >
            
           
            <View style={{paddingTop:10,paddingLeft:20}}>
                <TouchableOpacity onPress={()=>{getBlockDetailsCondition(currentUserDetails)==false?confirModal('Block'):confirModal('unblock')}}>
               {getBlockDetailsCondition(currentUserDetails)==false? <View>
                <Text
               style={{fontSize:18,}}
               >Block</Text>
                <Text
               style={{fontSize:14,}}
               >Restrict messages for this chat.</Text>
               </View>:<Text style={{fontSize:18,}}>Unblock</Text>}
               </TouchableOpacity>
            </View>
            <View style={{borderWidth:1,width:responsiveWidth(98),marginLeft:4,borderColor:'#FF5864',marginTop:10}}></View>
            <View style={{paddingTop:10,paddingLeft:20}}>
            <TouchableOpacity onPress={()=>setIsDialogVisible(true)}>
               <View>
               <Text style={{fontSize:18,}}>Report</Text>
               <Text
               style={{fontSize:14,}}
               >There's something wrong with this chat.</Text>
               </View>
                </TouchableOpacity>
            </View>
            <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Reason</Dialog.Title>
            <Dialog.Content>
              <TextInput
              numberOfLines={5}
              multiline={true}
              
                value={inputVal}
                onChangeText={text => setInputVal(text)}
              />
            
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                inputVal && reportUser(inputVal)

              }}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

            </KeyboardAvoidingView>
            </Provider>
        </SafeAreaView>
    )
}

export default MessageDetailsScreen;
