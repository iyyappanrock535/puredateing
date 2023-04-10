import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
// import * as Google from 'expo-auth-session/providers/google';
import {
    onAuthStateChanged,
    signOut,

} from "@firebase/auth"
import { auth } from '../firebase';

const AuthContext = createContext({});

// const config = {
//     androidClientId : '926900691816-guu5euteap95q0faeoc0u7da16bin8of.apps.googleusercontent.com',
//     iosClientId : '926900691816-rq7vg327n1j97n1cn58te4rv4kogto5p.apps.googleusercontent.com',
//     scopes : ["profile","email"],
//     permissions : ["public_profil","email","gender","location"], 
// }

export const AuthProvider = ({ children }) => {
    
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] =useState(true);
    const [loading, setLoading] = useState(false);

   useEffect(() => {
     onAuthStateChanged(auth, (user) =>{
         if(user){
            //  Logged in
            setUser(user);
         }else{
            //  not logged
            setUser(null); 
         }

        setLoadingInitial(false);
     })
   }, [])

    const logout = () => {
        setLoading(true);

        signOut(auth)
        .catch((error) => setError(error))
        .finally(() => setLoading(false));  
    }
    
    // const signInWithGoogle = async () => {
    //     setLoading(true);

    //     await Google.logInAsync(config).then(async (logInResult)=>{
    //         if(logInResult.type === "success"){
    //             // login....
    //             const { idToken , accessToken} = logInResult;
    //             const credential = GoogleAuthProvider.credential(idToken,accessToken);
    //             await signInWithCredential(auth,credential);

    //         }
    //         return Promise.reject(); 
    //     }).catch(error => setError(error))
    //     .finally(() => setLoading(false));
    // }

    const memoedValue = useMemo(
        () => ({
            user ,
            loading,
            error,
            // signInWithGoogle,
            logout,
        }),
        [user, loading, error]
    );


    return (
        <AuthContext.Provider 
        value={memoedValue}
        >
            {/* {children} */}
            {!loadingInitial && children}

        </AuthContext.Provider>
    );
};

export default function useAuth(){
    return useContext(AuthContext);
}


