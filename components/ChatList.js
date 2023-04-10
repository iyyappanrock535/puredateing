import { TwitterAuthProvider } from 'firebase/auth';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import useAuth from '../hooks/useAuth';
import ChatRow from '../components/ChatRow';
import tw from 'tailwind-rn';
import { firebase , db} from "../firebase";
import {  getFirestore, collection, where, query, getDocs, onSnapshot, getDoc, doc } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const ChatList = () => {

    const [matches , setMatches] = useState([]);
   
    const {user}= useAuth();
    

    useEffect(() => {
        // getUserChats()
        const userId = getAuth().currentUser.uid;
        console.log('userIduserIduserIduserId',userId);
        console.log('user.uiduser.uid',user.uid);
        onSnapshot(
            query(
                collection(db, "matches"),
                where("userMatched","array-contains", userId)
            ),
            (snapshot) => setMatches(snapshot.docs.map(doc =>({
                id : doc.id,
                ...doc.data(),
            })))
        )
    
    }, [])
   
    // console.log(matches);
    return matches.length > 0 ? (
        <FlatList
            data={matches}
            keyExtractor= {item => item.id}
            renderItem={({item}) => <ChatRow matchDetails={item}/>}
        /> 
    ) :(
        <View style={tw('p-5')}>
            <Text>No user to chat with yet...🥺</Text>
        </View>
    );
    
};

export default ChatList
