import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ModalScreen from "./screens/ModalScreen";

import Chat from './screens/ChatScreen';
import login from './screens/login';
import ImgUpload from './screens/ImgUpload';
import Reset from './screens/Reset'
import useAuth from './hooks/useAuth';
import MatchedScreen from './screens/MatchedScreen';
import MessageScreen from './screens/MessageScreen';
import Signup from './screens/Signup';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Dummy from './screens/Dummy';
import ModalScreen2 from './screens/ModalScreen2';
import MessageDetailsScreen from './screens/chatDetails';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth(); 
  return (
      <Stack.Navigator
          screenOptions={{
              headerShown : false,
          }}>
          {user ? (
              <>
              <Stack.Group>

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Message" component={MessageScreen} />
                <Stack.Screen name="MessageDetailsScreen" component={MessageDetailsScreen} />
                <Stack.Screen name="ImgUpload" component={ImgUpload} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="dummy" component={Dummy} />




              </Stack.Group>
              <Stack.Group >
                <Stack.Screen name="Modal" component={ModalScreen} />
                <Stack.Screen name="Modal1" component={ModalScreen2} />

              </Stack.Group>
              <Stack.Group screenOptions={{presentation:"transparentModal"}}>
                <Stack.Screen name="Match" component={MatchedScreen} />
              </Stack.Group>
                </>
                ) : (
                  <Stack.Group>
                    <Stack.Screen name="signup" component={Signup} />
                    <Stack.Screen name="register" component={Register} />
                    <Stack.Screen name="rst" component={Reset} />
                  </Stack.Group>
                )}

      </Stack.Navigator>
    
  );
}

export default StackNavigator;