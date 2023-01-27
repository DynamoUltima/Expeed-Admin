
import { LockClosedIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from "react"
import { auth, db } from '../firebase/clientApp';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import  { useRouter } from 'next/router';
import Dashboard from './dashboard';
import { useAuth } from '../context/AuthContext';


const useUser = () => ({ user: null, loading: false })



const Auth = (): JSX.Element => {

  const { user, signup,login,signIn } = useAuth();
    console.log(user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  //  const router = useRouter();

   
 
  // const [userID, setUserID] = useState('');

  // const { user, loading } = useUser()

  

    

    const handleSignUp = async(e: any) => {
      e.preventDefault()

      try {
        await signup(email,password);
      } catch (error) {
        console.log(error);
        
      }

      console.log({email,password})
    }


    const handleLogin = async(e: any) => {
      e.preventDefault()

      try {
        // await login(email,password);
       await signIn(email,password)
        setEmail('');
        setPassword('')
        // router.push('/addClients')
        
      } catch (error) {
        console.log(error);
        
      }


      console.log({email,password})
  
    }






  


 


  return (
    <>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">

              <a  className="font-medium text-lg text-indigo-600 hover:text-indigo-500">
                Expeed Admin
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
              {/* href="/dashboard"  */}
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                // onSubmit={handleSignUp}
                onClick={handleLogin}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>

            {/* <div>
              {userID}
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}


/**
 * 
 * () => signInWithEmailAndPassword(auth, email, password).then(async (value) => {

                    // console.log(value);
                    setUserID(value.user.uid.toString)
                    // router.push('/dashboard',as, options);
                    // console.log(email);
                    // console.log('sucessssssssssss');

                    // if (value.user.emailVerified) {
                    //    router.push('/dashboard');
                    // }
                   





                  }).catch((error) => {
                    // console.log(error);
                    console.log(email)
                    // setUserID(error.toString);

                  }).finally(
                    ()=>router.push('/dashboard'))
 */

export default Auth;
