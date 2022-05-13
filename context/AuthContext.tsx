import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/clientApp';
import {setDoc,doc} from "firebase/firestore"



const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    console.log('Auth Context');
    console.log(user);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async(users) => {
            if (users) {
                setUser({
                    uid: users.uid,
                    email: users.email,
                    displayName: users.displayName
                });
                // await setDoc(doc(db,"users",users.uid),user)
            } else {
                setUser(null);
            }

            

            setLoading(false);

        });

        return () => unsubscribe();


    }, [])


    const login = (email: string, passowrd: string) => {
        console.log('login')

        return signInWithEmailAndPassword(auth, email, passowrd);
    }

    const signup = (email: string, passowrd: string) => {

        return createUserWithEmailAndPassword(auth, email, passowrd);
    }

    const logout = async () => {
        return await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}