import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'tailwind-rn';

const MatchedScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const {loggedInProfile, userSwiped} = params;
    return (
        <View style={[tw("h-full bg-red-500 pt-20"), {opacity:0.89}]}>
            <View style={[tw("justify-center px-10 pt-20")]}>
                <Image
                    style={tw("h-20 w-full")}
                    source={ require('../assets/matched_w.png')}
                />

            </View>

            <Text style={tw("text-white text-center mt-5")}>
                You and {userSwiped.displayName} have liked each other.
            </Text>
            <View style={tw("flex-row justify-evenly mt-5")}>
                <Image
                    style={tw("h-32 w-32 rounded-full")}
                    
                    source={{uri:`data:image/jpeg;base64,${userSwiped.profileUrl}`}}
                />
                <Image
                    style={tw("h-32 w-32 rounded-full")}
                    source={{uri:`data:image/jpeg;base64,${loggedInProfile.profileUrl}`}}
                />  
            </View>
            
            <TouchableOpacity
                style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
                onPress={()=>{
                    navigation.goBack();
                    navigation.navigate("Chat");
                }}
            >
                <Text style={tw("text-center")}>Send a Message</Text>
                </TouchableOpacity>
        </View>
    )
}

export default MatchedScreen
