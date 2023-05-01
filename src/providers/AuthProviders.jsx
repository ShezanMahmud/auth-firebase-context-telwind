import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const auth = getAuth(app)

// eslint-disable-next-line react/prop-types
const AuthProviders = ({ children }) => {
   // eslint-disable-next-line no-unused-vars
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)

   const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
   }

   const signIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
   }

   const logout = () => {
      return signOut(auth)
   }

   // observe auth state change
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         console.log('auth state change', currentUser);
         setUser(currentUser);
         setLoading(false);
      })
      return () => {
         unsubscribe()
      }
   }, [])

   const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      logout
   }

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProviders;