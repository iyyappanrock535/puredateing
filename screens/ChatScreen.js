import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header  from '../components/Header';
import tw from 'tailwind-rn';
import ChatList from '../components/ChatList';

const ChatScreen = () => {
    return (
        <View>
            <SafeAreaView>
                <Header  title="Chat"/>
                <ChatList />
            </SafeAreaView>
            
        </View>
    )
}

export default ChatScreen;