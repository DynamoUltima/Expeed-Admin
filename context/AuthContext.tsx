import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/clientApp';
import { setDoc, doc } from "firebase/firestore"
import axios from 'axios';
import { useRouter } from 'next/router';

export interface ISignin {
    message: string;
    data: Data;
    token: string;
}

export interface Data {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}



const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Data | null>();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setisAuthenticated] = useState(false);

    // 
    const [token, setToken] = useState('');
    const router = useRouter();

    console.log('Auth Context');
    console.log(user);







    // Login via Mongo
    const signIn = async (email: String, password: String) => {

        const response = await axios.post('api/signin', {
            email, password
        })


        const signInResponse: ISignin = response.data
        console.log(' called')
        console.log(signInResponse)
        console.log(response);
        // console.log(signInResponse.token)



        if (signInResponse.token) {
            setToken(signInResponse.token)
            setisAuthenticated(true)
            setUser(signInResponse.data)
            router.push('/addClients')
        }










    }





    useEffect(() => {

        // const unsubscribe = onAuthStateChanged(auth, async (users) => {
        //     if (users) {
        //         setUser({
        //             uid: users.uid,
        //             email: users.email,
        //             displayName: users.displayName
        //         });
        //         // await setDoc(doc(db,"users",users.uid),user)
        //     } else {
        //         setUser(null);
        //     }
        //     setLoading(false);

        // });

        // return () => unsubscribe();


        // Add a listener to check the auth state
        const authListener = () => {
            // check the auth state
            if (isAuthenticated) {

                console.log(user + 'from auth context')
            } else {
                setUser(null)

            }
            setLoading(false)
        };
        authListener();


    }, [isAuthenticated, user])


    const login = (email: string, passowrd: string) => {
        console.log('login')

        return signInWithEmailAndPassword(auth, email, passowrd);
    }

    const signup = (email: string, passowrd: string) => {

        return createUserWithEmailAndPassword(auth, email, passowrd);
    }

    const logout =  () => {

        setisAuthenticated(false);
        setLoading(true)
        setToken('')



        return 
    }









    return (
        <AuthContext.Provider value={{ user, login, signup, logout, token, setToken, signIn }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}