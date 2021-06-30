import { BrowserRouter, Route } from "react-router-dom";
import { createContext, useState } from "react";

import { auth, firebase } from './services/firebase'

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: String;
  name: String;
  avatar: String;
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  const [user, setUser] = useState<User>()

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

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
