import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet ,Image,TouchableOpacity} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/core"
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'tailwind-rn';

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setmatchedUserInfo] = useState(null);
    
    useEffect(() => {
        setmatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user])

    // useEffect(())


    return (
        <TouchableOpacity style={[tw("flex-row items-center py-3 px-5 mx-3 bg-white my-1 rounded-lg"),
        styles.cardShadow,
        ]}
            onPress={() => navigation.navigate('Message',{
                matchDetails,
            }
            )}
        >
            <Image 
                style={tw("rounded-full h-16 w-16 mr-4")}
                source={{uri:`data:image/jpeg;base64,${matchedUserInfo?.profileUrl}`}}
            />
            <View>
                <Text style={tw('text-lg font-semibold')}>
                    {matchedUserInfo?.displayName}
                </Text>

                {/* <Text style={tw('text-lg ')}>
                   Hey
                </Text> */}
            </View>

        </TouchableOpacity>
    )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width :0,
            height :1,
        },
        shadowOpacity : 0.2,
        shadowRadius : 1.41,

        elevation: 2,
    }
})
