import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/clientApp';


const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    console.log(user);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                });
            } else {
                setUser(null);
            }

            setLoading(false);

        });

        return () => unsubscribe();


    }, [])


    const login = (email: string, passowrd: string) => {

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