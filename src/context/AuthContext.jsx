import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);   
    const [loading, setLoading] = useState(true);

    //register
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    //login
    const loginUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const signWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
        
        
    }

    const logout = async () => {
        return signOut(auth);
    }

    //manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photoURL: photoURL
                }
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}