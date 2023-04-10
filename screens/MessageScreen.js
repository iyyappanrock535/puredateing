import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
// import React from 'react'
import { View, Text, KeyboardAvoidingView, Button, FlatList, Keyboard } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Header  from '../components/Header';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-rn';
import SenderMessage from '../components/SenderMessage';
import RecieverMessage from '../components/RecieverMessage';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, doc, getFirestore, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import _ from 'lodash'
import { getAuth } from 'firebase/auth';


const MessageScreen = () => {
    const navigation = useNavigation();
    const {user} = useAuth();
    const { params } =useRoute();
    const { matchDetails } = params;
    const [input , setInput] = useState("");
    const [messages, setMessage] = useState("");
    const [currentUserDetails, setcurrentUserDetails] = useState({})
    const [OppsideUserDetails, setOppsideUserDetails] = useState({})
const [isReported, setisReported] = useState('')
    useEffect(() => {
        getCureentUserDetails()
        if(_.get(matchDetails,'userMatched')){
            getuserBlockId()
            getreportDetails(_.get(matchDetails,'userMatched'))
        }
    }, [])
    const getreportDetails =(ids)=>{
        let oppsideId =getuserBlockId1()
        const userId = getAuth().currentUser.uid;
        const reportedUsersRef = collection(getFirestore(), 'reportedUsers');
        getDocs(reportedUsersRef).then((querySnapshot) => {
            const reportedUsers = [];
            querySnapshot.forEach((doc) => {
              // Retrieve the reported user data and add it to the reportedUsers array
              const reportedUser = doc.data();
              reportedUsers.push(reportedUser);
            });
            console.log('sdsdsdssdsdssdfsdfsdfsd', reportedUsers);

let a = _.filter(reportedUsers, (user) => user?.reporterId==userId &&user?.reportedUserId==oppsideId)
let b = _.filter(reportedUsers, (user) => user?.reporterId==oppsideId &&user?.reportedUserId==userId)
if(_.size(a)>0 || _.size(b)>0){
    setisReported(true)
}else{
    setisReported(false)
}
          }).catch((error) => {
           
          });
    }
    const getuserBlockId =()=>{
        const userId = getAuth().currentUser.uid;
       
       let a = matchDetails.userMatched.filter(user=>userId!=user)[0]
       getCureentUserDetails(a)
    }

    const getuserBlockId1 =()=>{
        const userId = getAuth().currentUser.uid;
       
       let a = matchDetails.userMatched.filter(user=>userId!=user)[0]
       return a
    }
    
    const getCureentUserDetails =async(id)=>{
        if(id){
            const userRef = doc(getFirestore(), 'users', id);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              // Do something with userData
              setOppsideUserDetails(userData)
            }
        }else{
            const userId = getAuth().currentUser.uid;
            const userRef = doc(getFirestore(), 'users', userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              // Do something with userData
              setcurrentUserDetails(userData)
        }
       
    }
    }
    useEffect(() => {
        onSnapshot(
            query(
            collection(db, 'matches', matchDetails.id, 'messages'),
            orderBy("timestamp", "desc")
            ), snapshot =>
            setMessage(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
            }))
            )
        );
    }, [matchDetails, db]);
   
    const sendMessage = () =>{
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp : serverTimestamp(),
            userId : user.uid,
            displayName : user.displayName,
            photoURL : matchDetails.users[user.uid].profileUrl,
            message : input,
        })

        setInput("");
    };
console.log('ds nf sndf nsd',matchDetails, user);

  
const getBlockDetailsCondition =(detail1,detail2)=>{
   
        if(_.get(detail2,'id') && _.includes(_.get(detail2,'blockedUsers'),_.get(detail1,'id'))==true){
            return true
        }if(_.get(detail1,'id') && _.includes(_.get(detail1,'blockedUsers'),_.get(detail2,'id'))==true) {
            return true;
        } else {
            return false
        }
    
    }
    return (
        <SafeAreaView style={tw("flex-1")}>
            <Header
            onpressChatSetting={()=>navigation.navigate('MessageDetailsScreen',{matchDetails}) }
            type={'signleChat'}
            showOption={isReported}
             title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} 
             callEnabled
              />

            <KeyboardAvoidingView
            behavior={Platform.OS ==="ios" ? "padding" : "height"}
            style={tw("flex-1")}
            keyboardVerticalOffset={10}
            >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
           
            <FlatList
                inverted ={-1}
                data={messages}
                style={tw("pl-4")}
                keyExtractor ={item => item.id}
                renderItem = {({item : message }) => 
                message.userId === user.uid ?(
                    <SenderMessage key={message.id} message={message}/>
                ) : (
                    <RecieverMessage key={message.id} message={message} />
                )}
            />
            {/* </TouchableWithoutFeedback> */}


           {isReported==false &&_.get(currentUserDetails,'id') &&_.get(OppsideUserDetails,'id') && getBlockDetailsCondition(currentUserDetails,OppsideUserDetails)==false && <View
                style={tw(
                    "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
                    )}
            >
            <TextInput
            style={tw("h-10 text-lg")}
            placeholder ="Type Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            />

            <Button onPress={sendMessage} title="Send" color="#FF5864" />
            </View>}

            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

export default MessageScreen
