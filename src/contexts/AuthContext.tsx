import { auth, firebase } from '../services/firebase'
import { createContext, useState, useEffect } from "react";
import { ReactNode } from 'react';

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextProviderType = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthContextProvider(props: AuthContextProviderType){
    const [user, setUser] = useState<User>()
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
          const { displayName, photoURL, uid} = user
    
          if(!displayName || !photoURL)throw new Error('Missing information from Google Account')
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
  
          })
        }
      })
  
      return()=>{
        unsubscribe();
      }
    }, [])
  
    async function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
  
      const resposta = await auth.signInWithPopup(provider)
  
      if(resposta.user){
        const { displayName, photoURL, uid} = resposta.user
  
        if(!displayName || !photoURL)throw new Error('Missing information from Google Account')
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }


    return(
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}