import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();

  // ! logIn logIn logIn logIn 
  function logIn(email, password, displayName) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // ! signUp signUp signUp signUp
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // ! logOut logOut logOut logOut
  function logOut() {
    return signOut(auth);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
