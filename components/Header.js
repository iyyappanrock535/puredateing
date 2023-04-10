import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn';
import { Foundation } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const header = ({title,type='',onpressChatSetting,showOption='' }) => {
    const navigation = useNavigation();
    return (
        <View style={tw('p-2 flex-row items-center justify-between')}>
            <View style={tw("flex flex-row items-center")}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-2")}>
                    <Ionicons name="chevron-back-outline" size={34} color="#FF5864"/>
                </TouchableOpacity>
                <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
               {type=="signleChat" &&  showOption==false && <TouchableOpacity onPress={()=>onpressChatSetting('modal')} style={{marginLeft:responsiveWidth(32)}}>
                <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>}
            </View>
          
        </View>
    );
};

export default header
