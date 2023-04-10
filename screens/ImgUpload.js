import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image,TouchableOpacity, ScrollView, Button } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { doc } from "@firebase/firestore";
import {  db} from "../firebase";
import {  onSnapshot } from '@firebase/firestore';
import tw from "tailwind-rn";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking} from 'react-native'
import { useNavigation } from "@react-navigation/core";


const ImgUpload = () => {
    const { user, logout } = useAuth();  
    const navigation = useNavigation();
    const [profile, setProfile] = useState([]);
    
    Data = "No";
   

    if (Data === "No"){
        useLayoutEffect(
            () =>{
        onSnapshot(doc(db, 'users',user.uid), snapshot => {
                if(snapshot.exists()) {
                    setProfile(snapshot.data());
                    Data = "Yes"
                }
        
            }
            )
        });
    }
    const UserProfile = () => {
        if (Data === "Yes"){
            navigation.navigate("profile");
           
        }else{
            navigation.navigate("Modal");
        }
      }

    // useLayoutEffect(
    //     () =>{
    //    onSnapshot(doc(db, 'users',user.uid), snapshot => {
    //         if(!snapshot.exists()) {
    //             navigation.navigate("Modal");
    //         }else{
    //             // const d = (snapshot) => snapshot.docs.map((doc) => doc.id);
    //             // console.log(snapshot.data().intrested);
    //             setProfile(snapshot.data());
    //             // Data = "Yes";
    //         }
        
    //     }
    //     )
    // });
   
    // console.log(Data);

   

    return (
        <SafeAreaView style={styles.container}>
                
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    
                   {/* console.log(Data); */}
                    {/* <Image source={{uri:`data:image/jpeg;base64,${profile.profileUrl}`}}  style={styles.image} resizeMode="center"></Image> */}
                    
                   
                    <Image 
                   style={styles.image} 
                   resizeMode="center"
                     source={ require('../assets/faviconm.png')} 
                    />
                </View>
               
            </View>

            <View style={styles.infoContainer}>
                {/* <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{profile.displayName}</Text>  */}
                <Text style={[styles.text, { color: "red", fontSize: 14 }]}>Pure Dating - for the unvaxed</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                     <Text style={[styles.text, { fontSize: 20 }]} onPress={UserProfile}>My Profile</Text>
                    {/* <Text style={[styles.text, styles.subText]}>Share Love</Text>  */}
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 20 }]}
                        onPress={() => {
                            Linking.openURL('https://puredating.live');
                            }}
                    >DONATE</Text>
                    {/* <Text style={[styles.text, styles.subText]}>Love Pure</Text> */}
                </View>
                <View style={styles.statsBox}>
                     <Text style={[styles.text, { fontSize: 20 }]}
                     onPress={() => {
                        Linking.openURL('https://puredating.live');
                        }}
                     >Website</Text>
                    {/* <Text style={[styles.text, styles.subText]}>Following</Text> */} 
                </View>
            </View>

            {/* <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
                
            </View> */}
            <Text style={[styles.subText, styles.recent]}>ABOUT pure dating</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                         Pure Dating is a service for like minded people to connect
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        Please share our website 
                            <Text style={styles.hyperlinkStyle}
                            onPress={() => {
                            Linking.openURL('https://puredating.live');
                            }}>, puredating.live .</Text>
                             and social media nexus points with your like-minded friends to help grow our healthy community
                        </Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        Produced by 
                            <Text style={styles.hyperlinkStyle}
                            onPress={() => {
                            Linking.openURL('https://www.instagram.com/wegadesk1987/');
                            }}>. WEGADESK  </Text>
                            and 
                            <Text style={styles.hyperlinkStyle}
                            onPress={() => {
                            Linking.openURL('https://www.instagram.com/f_a_i_z_mohammad/');
                            }}>. Faiz (Freelancer)</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        Donations to further development can be sent to .
                        <Text style={styles.hyperlinkStyle}>Wegadesk@gmail.com</Text>
                        </Text>
                    </View>
                </View>
             
                <View>
                <TouchableOpacity
                 onPress = {logout} 
                 style={[tw('w-60 p-3 rounded-xl center top-5 bottom-0 bg-red-400')
                ]}>
     
                
              <Text style={tw("text-center text-white text-xl")}>Signout</Text>
              
       </TouchableOpacity> 
       
      
                </View>
               
  
            </View>

    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        
        color: "#52575D"
    },
    hyperlinkStyle: {
        color: '#f87171',
      },
    image: {
        flex: 1,
        paddingTop: 10,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        paddingTop: 59,
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});


export default ImgUpload
