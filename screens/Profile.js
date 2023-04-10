// import React, { useLayoutEffect, useState } from "react";
// import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import useAuth from "../hooks/useAuth";
// import { doc } from "@firebase/firestore";
// import {  db} from "../firebase";
// import {  onSnapshot } from '@firebase/firestore';
// import tw from "tailwind-rn";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Linking} from 'react-native'
// import { useNavigation } from "@react-navigation/core";
// import { FullWindowOverlay } from "react-native-screens";


// const Profile = () => {
//     const { user, logout } = useAuth();  

   
//     const navigation = useNavigation();
//     const [profile, setProfile] = useState([]);
//     // const [profile2, setProfile2] = useState([]);


//     useLayoutEffect(
//         () =>{
//        onSnapshot(doc(db, 'users',user.uid), snapshot => {
//             if(snapshot.exists()) {
//                 setProfile(snapshot.data());
//             }
//         }
//         )
//     });
    
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//               <View style={styles.headerContent}>
//                   <Image style={styles.avatar} source={{uri:`data:image/jpeg;base64,${profile.profileUrl}`}} />
//                   <Text style={styles.name}>
//                   {profile.displayName}
//                   </Text>
//               </View>
//             </View>
  
//             <View style={styles.profileDetail}>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>Age</Text>
//                 <Text style={styles.count}>{profile.age}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>City</Text>
//                 <Text style={styles.count}>{profile.city}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>Interest</Text>
//                 <Text style={styles.count}>{profile.intrested}</Text>
//               </View>
//             </View>

//             <View style={styles.profileDetail1}>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title1}>Hobby</Text>
//                 <Text style={styles.count}>{profile.hobby1}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title1}>Hobby</Text>
//                 <Text style={styles.count}>{profile.hobby2}</Text>
//               </View>
              
//             </View>
  
//             <View style={styles.body}>
//               <View style={styles.bodyContent}>
//                 <TouchableOpacity >
//                   <Text></Text>  
//                 </TouchableOpacity> 
//                 <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
//               </View>
//           </View>
//           <View style={styles.statsContainer}>
//                <View style={styles.statsBox}   >
//                      <Text style={[styles.text, { fontSize: 20 }]}>Date Pure</Text>
//                     {/* <Text style={[styles.text, styles.subText]}>Share Love</Text>  */}
//                 </View>
//                 <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
//                     <Text style={[styles.text, { fontSize: 20 }]}>Love Pure</Text>
//                     {/* <Text style={[styles.text, styles.subText]}>Love Pure</Text> */}
//                 </View>
//                 <View style={styles.statsBox}>
//                      <Text style={[styles.text, { fontSize: 20 }]}>Live Pure</Text>
//                     {/* <Text style={[styles.text, styles.subText]}>Following</Text> */} 
//                 </View>
//             </View>

//             {/* button */}
//             <View style={styles.btnCtr}>
//                 <TouchableOpacity
//                  onPress={() => navigation.navigate("Modal1")} 
//                  style={[tw('w-60 p-3 rounded-xl  top-5 bottom-0 bg-red-400')]
//                 }>
//                     <Text style={tw("text-center text-white text-xl")}>Edit Profile</Text>     
//                 </TouchableOpacity> 
//                 </View>
//              </View>
            
//       );
//     }
  
  
//   const styles = StyleSheet.create({
//     header:{
//       backgroundColor: "#F87171",

//     },
//     headerContent:{
//       padding:30,
//       alignItems: 'center',
//     },
//     btnCtr:{
//       alignItems: 'center',
//     },
//     avatar: {
//       width: 130,
//       height: 130,
//       borderRadius: 63,
//       borderWidth: 4,
//       borderColor: "white",
//       marginBottom:10,
//     },
//     name:{
//       fontSize:22,
//       color:"#FFFFFF",
//       fontWeight:'600',
//     },
//     profileDetail:{
//       alignSelf: 'center',
//       marginTop:250,
//       alignItems: 'center',
//       flexDirection: 'row',
//       position:'absolute',
//       width:'95%',
//       backgroundColor: "#F87171",
//       padding: 10,
//     },
//     profileDetail1:{
//         alignSelf: 'center',
//         marginTop:350,
//         width:'95%',
//         alignItems: 'center',
//         flexDirection: 'row',
//         position:'absolute',
//         backgroundColor: "#F87171",
//         padding: 10
//       },
//     detailContent:{
//       margin:30,
//       alignItems: 'center'
//     },
//     title:{
//       fontSize:20,
//     //   color: "#00CED1"
//     color:'white'
//     },
//     title1:{
//         fontSize:20,
//         color: "white"
//       },
//     count:{
//       fontSize:18,
//       color: 'white'
//     },
//     bodyContent: {
//       flex: 1,
//       alignItems: 'center',
//       padding:30,
//       marginTop:40
//     },
//     textInfo:{
//       fontSize:18,
//       marginTop:20,
//       color: "#696969",
//     },
//     buttonContainer: {
//       marginTop:10,
//       height:45,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom:20,
//       width:250,
//       borderRadius:30,
//       backgroundColor: "#00CED1",
//     },
//     description:{
//       fontSize:20,
//       color: "#00CED1",
//       marginTop:10,
//       textAlign: 'center'
//     },
//     statsContainer: {
//         flexDirection: "row",
//         alignSelf: "center",
//         marginTop: '50%'
//     },
//     statsBox: {
//         alignItems: "center",
//         flex: 1
//     },
//   });
// //     return (
// //         <SafeAreaView style={styles.container}>
       
       
// //             <View style={{ alignSelf: "center" }}>
// //                 <View style={styles.profileImage}>
                    
// //                    {/* console.log(profile2) */}
// //                     <Image source={{uri:`data:image/jpeg;base64,${profile.profileUrl}`}}  style={styles.image} resizeMode="center"></Image>
                    
                   
                    
// //                 </View>
               
// //             </View>


// //             <View style={styles.infoContainer}>
// //                 <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.displayName}</Text> 
// //                 <Text style={[styles.text, { color: "red", fontSize: 14 }]}>Pure Dating - for the unvaxed</Text>
// //             </View>

// //             <View style={styles.statsContainer}>
// //                 <View style={styles.statsBox}
                
// //                 >
// //                      <Text style={[styles.text, { fontSize: 20 }]}>Date Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Share Love</Text>  */}
// //                 </View>
// //                 <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
// //                     <Text style={[styles.text, { fontSize: 20 }]}>Love Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Love Pure</Text> */}
// //                 </View>
// //                 <View style={styles.statsBox}>
// //                      <Text style={[styles.text, { fontSize: 20 }]}>Live Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Following</Text> */} 
// //                 </View>
// //             </View>

// //             {/* <View style={{ marginTop: 32 }}>
// //                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
// //                     <View style={styles.mediaImageContainer}>
// //                         <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
// //                     </View>
// //                     <View style={styles.mediaImageContainer}>
// //                         <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
// //                     </View>
// //                     <View style={styles.mediaImageContainer}>
// //                         <Image source={require("../assets/a.png")} style={styles.image} resizeMode="cover"></Image>
// //                     </View>
// //                 </ScrollView>
                
// //             </View> */}
// //             <Text style={[styles.subText, styles.recent]}>ABOUT pure dating</Text>
// //             <View style={{ alignItems: "center" }}>
// //                 <View style={styles.recentItem}>
// //                     <View style={styles.activityIndicator}></View>
// //                     <View style={{ width: 250 }}>
// //                         <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
// //                          Pure Dating is a service for like minded people to connect
// //                         </Text>
// //                     </View>
// //                 </View>

// //                 <View style={styles.recentItem}>
// //                     <View style={styles.activityIndicator}></View>
// //                     <View style={{ width: 250 }}>
// //                         <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
// //                         Please share our website 
// //                             <Text style={styles.hyperlinkStyle}
// //                             onPress={() => {
// //                             Linking.openURL('https://puredating.live');
// //                             }}>, puredating.live .</Text>
// //                              and social media nexus points with your like-minded friends to help grow our healthy community
// //                         </Text>
// //                     </View>
// //                 </View>
// //                 <View style={styles.recentItem}>
// //                     <View style={styles.activityIndicator}></View>
// //                     <View style={{ width: 250 }}>
// //                         <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
// //                         Produced by 
// //                             <Text style={styles.hyperlinkStyle}
// //                             onPress={() => {
// //                             Linking.openURL('https://www.instagram.com/wegadesk1987/');
// //                             }}>. WEGADESK  </Text>
// //                             and 
// //                             <Text style={styles.hyperlinkStyle}
// //                             onPress={() => {
// //                             Linking.openURL('https://www.instagram.com/f_a_i_z_mohammad/');
// //                             }}>. Faiz (Freelancer)</Text>
// //                         </Text>
// //                     </View>
// //                 </View>
// //                 <View style={styles.recentItem}>
// //                     <View style={styles.activityIndicator}></View>
// //                     <View style={{ width: 250 }}>
// //                         <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
// //                         Donations to further development can be sent to .
// //                         <Text style={styles.hyperlinkStyle}>Wegadesk@gmail.com</Text>
// //                         </Text>
// //                     </View>
// //                 </View>
             
              
               
  
// //             </View>

// //     </SafeAreaView>
// //     )
// // }
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: "#FFF"
// //     },
// //     text: {
        
// //         color: "#52575D"
// //     },
// //     hyperlinkStyle: {
// //         color: '#f87171',
// //       },
// //     image: {
// //         flex: 1,
// //         paddingTop: 10,
// //         height: undefined,
// //         width: undefined
// //     },
// //     titleBar: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         marginTop: 24,
// //         marginHorizontal: 16
// //     },
// //     subText: {
// //         fontSize: 12,
// //         color: "#AEB5BC",
// //         textTransform: "uppercase",
// //         fontWeight: "500"
// //     },
// //     profileImage: {
// //         width: 200,
// //         height: 200,
// //         borderRadius: 100,
// //         overflow: "hidden",
// //         paddingTop: 59,
// //     },
// //     dm: {
// //         backgroundColor: "#41444B",
// //         position: "absolute",
// //         top: 20,
// //         width: 40,
// //         height: 40,
// //         borderRadius: 20,
// //         alignItems: "center",
// //         justifyContent: "center"
// //     },
// //     active: {
// //         backgroundColor: "#34FFB9",
// //         position: "absolute",
// //         bottom: 28,
// //         left: 10,
// //         padding: 4,
// //         height: 20,
// //         width: 20,
// //         borderRadius: 10
// //     },
// //     add: {
// //         backgroundColor: "#41444B",
// //         position: "absolute",
// //         bottom: 0,
// //         right: 0,
// //         width: 60,
// //         height: 60,
// //         borderRadius: 30,
// //         alignItems: "center",
// //         justifyContent: "center"
// //     },
// //     infoContainer: {
// //         alignSelf: "center",
// //         alignItems: "center",
// //         marginTop: 16
// //     },
//     // statsContainer: {
//     //     flexDirection: "row",
//     //     alignSelf: "center",
//     //     marginTop: 32
//     // },
//     // statsBox: {
//     //     alignItems: "center",
//     //     flex: 1
//     // },
// //     mediaImageContainer: {
// //         width: 180,
// //         height: 200,
// //         borderRadius: 12,
// //         overflow: "hidden",
// //         marginHorizontal: 10
// //     },
// //     mediaCount: {
// //         backgroundColor: "#41444B",
// //         position: "absolute",
// //         top: "50%",
// //         marginTop: -50,
// //         marginLeft: 30,
// //         width: 100,
// //         height: 100,
// //         alignItems: "center",
// //         justifyContent: "center",
// //         borderRadius: 12,
// //         shadowColor: "rgba(0, 0, 0, 0.38)",
// //         shadowOffset: { width: 0, height: 10 },
// //         shadowRadius: 20,
// //         shadowOpacity: 1
// //     },
// //     recent: {
// //         marginLeft: 78,
// //         marginTop: 32,
// //         marginBottom: 6,
// //         fontSize: 10
// //     },
// //     recentItem: {
// //         flexDirection: "row",
// //         alignItems: "flex-start",
// //         marginBottom: 16
// //     },
// //     activityIndicator: {
// //         backgroundColor: "#CABFAB",
// //         padding: 4,
// //         height: 12,
// //         width: 12,
// //         borderRadius: 6,
// //         marginTop: 3,
// //         marginRight: 20
// //     }
// // });

//                   </Text>
//               </View>
//             </View>
  
//             <View style={styles.profileDetail}>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>Age</Text>
//                 <Text style={styles.count}>{profile.age}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>City</Text>
//                 <Text style={styles.count}>{profile.city}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title}>Interest</Text>
//                 <Text style={styles.count}>{profile.intrested}</Text>
//               </View>
//             </View>

//             <View style={styles.profileDetail1}>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title1}>Hobby</Text>
//                 <Text style={styles.count}>{profile.hobby1}</Text>
//               </View>
//               <View style={styles.detailContent}>
//                 <Text style={styles.title1}>Hobby</Text>
//                 <Text style={styles.count}>{profile.hobby2}</Text>
//               </View>
              
//             </View>


// export default Profile
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, Image, ScrollView, Button, Alert } from "react-native";
import useAuth from "../hooks/useAuth";
import { doc } from "@firebase/firestore";
import {  db} from "../firebase";
import {  onSnapshot } from '@firebase/firestore';
import tw from "tailwind-rn";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking} from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { FullWindowOverlay } from "react-native-screens";
// import React from 'react';
// import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  // Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut,getAuth, deleteUser } from "firebase/auth";
import { responsiveWidth } from "react-native-responsive-dimensions";

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const Profile = () => {

      const { user, logout } = useAuth();  

   
    const navigation = useNavigation();
    const [profile, setProfile] = useState([]);
    // const [profile2, setProfile2] = useState([]);


    useLayoutEffect(
        () =>{
       onSnapshot(doc(db, 'users',user.uid), snapshot => {
            if(snapshot.exists()) {
                setProfile(snapshot.data());
            }
        }
        )
    });
  // const myCustomShare = async() => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     url: files.appLogo,
  //     // urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };
  
// //             <View style={styles.infoContainer}>
// //                 <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.displayName}</Text> 
// //                 <Text style={[styles.text, { color: "red", fontSize: 14 }]}>Pure Dating - for the unvaxed</Text>
// //             </View>

// //             <View style={styles.statsContainer}>
// //                 <View style={styles.statsBox}
                
// //                 >
// //                      <Text style={[styles.text, { fontSize: 20 }]}>Date Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Share Love</Text>  */}
// //                 </View>
// //                 <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
// //                     <Text style={[styles.text, { fontSize: 20 }]}>Love Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Love Pure</Text> */}
// //                 </View>
// //                 <View style={styles.statsBox}>
// //                      <Text style={[styles.text, { fontSize: 20 }]}>Live Pure</Text>
// //                     {/* <Text style={[styles.text, styles.subText]}>Following</Text> */} 
// //                 </View>
// //             </View>

const logoutAction =()=>{
  let auth = getAuth()
  signOut(auth).then((res)=>{
    navigation.navigate('signup')  
  }).catch((err)=>{
console.log('asdmnmasn',err);
  })
}
const confirModal =(type)=>{
  Alert.alert(
      'Confirm',
      `Are you sure to delete this account`,
      [
        {
          text: 'Okay',
          onPress: () =>{()=>deleteAction()},
          style: 'default',
        },
        {
          text: 'Cancel',
         
          style: 'cancel',
        },
      ],
      
    );
  
}

const deleteAction =()=>{

  let auth = getAuth().currentUser
 auth.delete().then((res)=>{
    navigation.navigate('signup')  
  }).catch((err)=>{
console.log('asdmnmasn',err);
  })
}
  return (
    <SafeAreaView style={styles.container}>
<ScrollView>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Avatar.Image 
            // source={{
            //   uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            // }}
            source={{uri:`data:image/jpeg;base64,${profile.profileUrl}`}}
            size={80}
          />
          

          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{profile.displayName}</Title>
            <Caption style={styles.caption}>Pure Dating - for the unvaxed</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{profile.city}</Text>
        </View>
        {/* <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View> */}
        {/* <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{profile.uemail}</Text>
        </View> */}
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>Hobbies</Title>
            <Caption>{profile.hobby1}</Caption>
            <Caption>{profile.hobby2}</Caption>

            
          </View>
          <View style={styles.infoBox}>
            <Title>Age</Title>
            <Caption>{profile.age}</Caption>
            <Title>Interest</Title>
            <Caption>{profile.intrested}</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => {}}> */}
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Love Pure , Live Pure , Date Pure</Text>
          </View>
        
        {/* </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Donate</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple >
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>
      <View style={styles.menuItem}>
      <Icon name="settings-outline" color="#FF6347" size={25}/>
      <Text style={styles.menuItemText}>ABOUT pure dating</Text>
      </View>
        <View style={styles.menuItem}>
                <View >
            
                    <View >
                        <Text >
                         Pure Dating is a service for like minded people to connect
                        </Text>
                
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        Please share our website 
                            <Text style={styles.hyperlinkStyle}
                            onPress={() => {
                            Linking.openURL('https://puredating.live');
                            }}>, puredating.live .</Text>
                             and social media nexus points with your like-minded friends to help grow our healthy community
                        </Text>
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
                        </Text>
                    </View>
                </View>

                <View>
                <TouchableOpacity
          onPress={()=>logoutAction()}
          style={[styles.button,tw('bg-red-400'),{marginTop:10,width:responsiveWidth(85),alignItems:'center',textAlign:'center',justifyContent:'center'}]}
         
        >
          <Text style={[styles.buttonText,{alignItems:'center',textAlign:'center',justifyContent:'center'}]}>Logout</Text>
        </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity
          onPress={()=>deleteAction()}
          style={[styles.button,tw('bg-red-400'),{marginTop:10,backgroundColor:'#C70000',width:responsiveWidth(85),alignItems:'center',textAlign:'center',justifyContent:'center'}]}
         
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
                </View>
            </View>
            </View></ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hyperlinkStyle: {
            color: '#f87171',
          },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 150,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    // backgroundColor: '#0782F9',
    width: '28%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});