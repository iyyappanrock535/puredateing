import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect,useRef, useState } from 'react'
import {  View, Text,  Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { Ionicons,  Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { collection, onSnapshot, setDoc,getDocs ,query, where, getDoc, serverTimestamp } from '@firebase/firestore';
import { doc } from "@firebase/firestore";
import {  db} from "../firebase";
import { Platform } from 'react-native'
import generateId from '../lib/generateId';

// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const Dummy = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);
    const window = Dimensions.get('window');


    // const [user1, setUser] = useState();
    const [intrest, userIntrest] = useState();
   
    useLayoutEffect(
        () =>{
       onSnapshot(doc(db, 'users',user.uid), snapshot => {
            if(!snapshot.exists()) {
                navigation.navigate("Modal");
            }else{
                // const d = (snapshot) => snapshot.docs.map((doc) => doc.id);
                // console.log(snapshot.data().intrested);
                userIntrest( snapshot.data().intrested);
            }
        
        }
        )
    });
   
      
    useEffect(() => {
  
        let unsub;
        // console.log(intrest);
        const fetchCard = async () => {
            const passes = await getDocs(collection(db,"users",user.uid,"passes")).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );
         

            const appreciate = await getDocs(collection(db,"users",user.uid,"appreciate")).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );

               

            const passedUserId = passes.length > 0 ? passes : ["test"];
            const appreciateUserId = appreciate.length > 0 ? appreciate : ["test"];
            // console.log(user.intrested);

            unsub = onSnapshot(
                query(
                    collection(db, 'users'),
                    where("id", "not-in", [...passedUserId, ...appreciateUserId] )
                ),
               
                (snapshot) =>{
                    setProfiles(
                        snapshot.docs
                            .filter((doc) =>  doc.id !== user.uid )
                            .map(doc => ({
                                id : doc.id,
                                ...doc.data(), 
                        })
                    ).filter((item) => item.intrested != intrest)
                    );
                });
            };

          
                fetchCard();
                
                
                return unsub;
            }, [intrest]); 

         

    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        // console.log('Swiped passon ${userSwiped.displayName}');
        setDoc(doc(db,"users",user.uid,"passes",userSwiped.id),userSwiped);
    };
    const swipeRight = async(cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await
         (await getDoc(doc(db, 'users', user.uid))
         ).data();
  
         //check if user is Swippedright 
         getDoc(doc(db, 'users', userSwiped.id,'appreciate', user.uid)).then(
             (DocumentSnapshot) => {
                 if(DocumentSnapshot.exists()){
                     //user has matched before you matched with users
                     // Create Match 
                    //  console.log(`You Matched with ${userSwiped.displayName}`)
                     setDoc(
                         doc(db, "users", user.uid,"appreciate", userSwiped.id),
                         userSwiped
                     );
                        //Create a Match 
                        setDoc(doc(db,'matches',generateId(user.uid,userSwiped.id)),{
                            users:{
                                [user.uid]: loggedInProfile,
                                [userSwiped.id] : userSwiped
                            },
                            userMatched : [user.uid, userSwiped.id],
                            timestamp : serverTimestamp(),
                        });

                        navigation.navigate('Match',{
                            loggedInProfile, 
                            userSwiped,
                        });
                 }else {
                     // user has swiped as first interation between the two or didn't get swiped
                    //  console.log(
                    //      `You swiped on ${userSwiped.displayName}`),
                         userSwiped
                     
                 }
             }
         )

        // console.log(`${userSwiped.displayName}` );
         setDoc(
             doc(db,"users",user.uid,"appreciate",userSwiped.id),
             userSwiped
         );
        
         
    };

    // const renderCard = card => {
    //   return (
    //     <View style={styles.card}>
    //       <Text style={styles.text}>{card}</Text>
    //     </View>
    //   );
    // };
  
    // const onSwipedAllCards = () => {
    //   this.setState({
    //     swipedAllCards: true
    //   });
    // };
  
    // const swipeBack = () => {
    //   if (!this.state.isSwipingBack) {
    //     this.setIsSwipingBack(true, () => {
    //       this.swiper.swipeBack(() => {
    //         this.setIsSwipingBack(false);
    //       });
    //     });
    //   }
    // };

    return (
        
        <SafeAreaView>
            {/* Header */}
            
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={() => navigation.navigate('dummy')}>
                <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={40} color="#FF5864" />
                    {/* <Entypo name="menu" size={40} color="#FF5864"/> */}
                </TouchableOpacity>
            

            <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
                    <Image 
                     style={tw("h-16 w-16 rounded-full")}
                    
                     source={ require('../assets/faviconm.png')} 
                    />
                

                </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                <Ionicons name="ios-chatbubbles-sharp" size={40} color="#FF5864"/>

               
            </TouchableOpacity>
        </View>

            {/* End Header */}
             {/* Card */}
      <View style={tw("flex-1 -mt-6")}>


        <Swiper
           style={styles.swiper}
        
            ref = {swipeRef}
            // containerStyle={{backgroundColor : "transparent"}}
            cards={profiles}
            stackSize ={3}
            cardIndex ={0}
             
            // animateCardOpacity
            animateOverlayLabelsOpacity
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex)=>{
              
                swipeLeft(cardIndex);
            }}
            onSwipedRight ={(cardIndex)=>{
              
                swipeRight(cardIndex);
            }}

            // onSwiped={this.onSwipedAllCards }
            backgroundColor = {"orange"}
            overlayLabels={{
                left :{
                    title :"pass",
                    style:{
                        label:{
                            textAlign :"right",
                            color : "red",
                            fontSize : 25,
                        },
                    },
                },
                right :{
                    title :"appreciate",
                    style:{
                        label:{
                            // textAlign :"right",
                            color : "#4DED30",
                            fontSize : 25,
                            
                        },
                    },
                },
            }}>
            
            renderCard={(card) => card ?(
                
               
            <View
            
                key = {card.id}
                style={tw(" relative bg-white h-3/4 rounded-xl")}>
                    <Image 
                        style={tw("absolute top-0 h-full w-full rounded-xl ")}
                        source={{uri:`data:image/jpeg;base64,${card.profileUrl}`}} 
             />

                <View 
                    style={[tw(
                    "absolute bottom-0 bg-white flex-row w-full justify-between items-center h-30 px-6 py-2 rounded-b-xl"
                    ),styles.cardShadow,
                    ]}
                >

                    <View>
                        <Text style={tw("text-xl font-bold")}>
                            {card.displayName} 
                        </Text>
                        <Text>
                            {card.city}
                        </Text>
                        <View style={[styles.parent] }>
                            <Text style={tw('rounded-lg px-1 bg-yellow-300 ')}>{card.hobby1} </Text> 
                            <Text style={tw('rounded-lg px-1 bg-yellow-300 ')}>{card.hobby2}</Text>
                        </View>
                       
                    </View>
                    {/* <Text>Age</Text> */}
                    <Text style={tw("text-xl ")}>{card.age}</Text>
                    


                </View>
            </View>
           )  : (
                <View
               
                style={[tw(" relative bg-white h-3/4 rounded-xl items-center ")]}
                
                >
                    <Text style={tw('text-xl font-serif hover:font-sans items-center ')}>😟 OOPS! No more profiles at this time</Text>
                    <Image

                      style={tw(" w-+ top-20 items-center")}
                      height={55}
                      width={150}
                      source={ require('../assets/purel.png')} 
                    />
                </View>
            )}      
        </Swiper>
        </View>
   
            <View style={[tw("flex flex-row justify-evenly"),{marginTop: '162%'}]}>
                <TouchableOpacity 
                onPress = {() =>swipeRef.current.swipeLeft()}
                  style={tw(
                    'items-center justify-center rounded-full w-16 h-16  bg-red-200  ')}>
                    <Entypo name="cross" size={30} color='red'/>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress = {() =>swipeRef.current.swipeRight()}
                style={tw(
                    'items-center justify-center rounded-full w-16 h-16 bg-green-200 ')}>
                    <Entypo name="heart" size={30} color='green'/>
                </TouchableOpacity>
            </View>
        
    </SafeAreaView>
    
    
    );
};

export default Dummy;



const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  swiper: {
    // paddingTop: Constants.statusBarHeight,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
});