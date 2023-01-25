/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { db } from '../firebase/clientApp';
import { addDoc, collection, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { sendData } from '../utils/send';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFormik } from 'formik';
import * as Yup from "yup";

// export  async function getServerSideProps (context:any){

//   console.log('called');

//   return  {
//       props: {message: 'hello world'},
//       // notFound:true
//   }
// }


interface FormData {
  email: string,
  password: string,

}

type CredentialInputs = {
  firstName: string,
  lastName: string,
  email: string,
  campus: string,
  city: string,
  phone: string,

};

function addClientsForm() {
  // console.log(message);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [clients, setClients] = useState({ firstName: '', lastName: '', email: '', campus: '', city: '', phone: '', });


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      campus: '',
      city: '',
      phone: '',
      expertise: '',
      serviceType: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 Characters or less')
        .required('first name is a required field!!'),
      lastName: Yup.string()
        .max(15, 'Must be 15 Characters or less')
        .required('first name is a required field!!'),
      email: Yup.string().email("Invalid email").required(),
      city: Yup.string().required(),
      phone: Yup.string(),
      campus: Yup.string(),
      expertise: Yup.string(),
      serviceType: Yup.string()

    }),
    onSubmit: async (values) => {
      console.log(values);
      console.log('clicked');
      try {
        console.log('clicked');

        const collectionRef = collection(db, "clients");

        //check if email already exists 
        //before adding a client
        // const docRefs = await addDoc(collectionRef, { ...values, timestamp: serverTimestamp(), })

        // await updateDoc(docRefs, {
        //   id: docRefs.id
        // })


        // console.log(docRefs)
        // console.log(docRefs.id)
        // // console.log(clients);


        // alert(`client with id ${docRefs.id} is added succesfully`)
        // setClients({ firstName: '', lastName: '', email: '', campus: '', city: '', phone: '', });

        const data = { ...values, timestamp: serverTimestamp(), }


        const res = await fetch('api/clients/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJLeWxpYW4iLCJlbWFpbCI6Imt5bGlhbkBnbWFpbC5jb20iLCJpZCI6IjYzZDEwMzgyZTQ0ODNkNTZlNjk2OTcwOSIsImlhdCI6MTY3NDY1MzMzMCwiZXhwIjoxNjc0NjU2OTMwfQ.QGX_1wr92pxs_u-I351Uvh6sTZdLtxj-JiS0nqVlNbI'
          },
          body: JSON.stringify(data)
        })


      const results= res.json
      console.log('results');
      console.log(results);


       console.log(results);
      //  alert(`client with id ${results} is added succesfully`)





        // .then(response => response.json())
        //   .then(data => {
        //     console.log(data+' data response')
        //     if (data.status === 'success') {
        //       // Do something with the successful response
        //       console.log(data)
        //     }
        //     //  else {
        //     //   // Handle the error
        //     // }
        //   })

      } catch (error) {

        console.log(error)

      }
    }
  })






  // }

  console.log(formik.values);


  return (
    <>



      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              {/* <div>{clients.toString()}</div> */}
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"

                        id="firstName"
                        autoComplete="given-name"

                        //value={clients.firstName}
                        // required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      // onChange={(e) => setClients({...clients, firstName: e.target.value })}
                      // ref= {register('firstName',{required:true})}
                      />
                      {formik.errors.firstName ? <p className='text-red-400 p-2'>{formik.errors.firstName} </p> : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors.lastName ? <p className='text-red-400 p-2'>{formik.errors.lastName} </p> : null}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors.email ? <p className='text-red-400 p-2'>{formik.errors.email} </p> : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Campus
                      </label>
                      <select

                        id="campus"
                        onChange={formik.handleChange}
                        value={formik.values.campus}
                        name="campus"
                        required
                        autoComplete="campus-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>University of Ghana Legon</option>
                        <option>KNUST</option>
                        <option>UPSA</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Expertise
                      </label>
                      <input
                        type="text"
                        name="expertise"
                        id="expertise"
                        onChange={formik.handleChange}
                        value={formik.values.expertise}
                        required
                        autoComplete="expertise"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        id="city"
                        required
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors.city ? <p className='text-red-400 p-2'>{formik.errors.city} </p> : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        required
                        // autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors.phone ? <p className='text-red-400 p-2'>{formik.errors.phone} </p> : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Service Type
                      </label>
                      <select

                        id="serviceType"
                        onChange={formik.handleChange}
                        value={formik.values.serviceType}
                        name="serviceType"
                        required
                        autoComplete="service-type"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Assignment</option>
                        <option>Proposals</option>
                        <option>Thesis</option>
                      </select>
                    </div>

                    {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div> */}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"

                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <p className="mt-1 text-sm text-gray-600">Decide which communications you&apos d like to receive and how.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">By Email</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Comments
                          </label>
                          <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="candidates" className="font-medium text-gray-700">
                            Candidates
                          </label>
                          <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="offers" className="font-medium text-gray-700">
                            Offers
                          </label>
                          <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div>
                      <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                      <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                          Everything
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                          Same as email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default addClientsForm;
