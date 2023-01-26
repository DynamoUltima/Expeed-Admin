import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps, PreviewData } from "next";
import { type } from "os";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../firebase/clientApp";

import { z } from "zod"
import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Client from "./clients";

export interface IClient {
    message: string;
    clients: Clients[];
}

export interface Clients {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    serviceType: ServiceType[];
    role: Role[];
    expertise: string[];
    created_on: Date;
    updated_on: Date;
    __v: number;
    createdBy?: string;
    password?: string;
}

// export type CreatedBy = "635cfef29a322c98bc11c294" | "63d10382e4483d56e6969709";

export type Role = "client" | "admin" | "provider";

export type ServiceType = "Assignment" | "Thesis" | "Proposals";




export default function Index() {

    const { data, isError, isLoading, error, isSuccess, } = useQuery<IClient>(["getClient"], fetchAllClients, { keepPreviousData: true });
     
    console.log('data')
    console.log(data)

    if(isError){
        return (<div>{error}</div>)
    }
    // console.log(message);
    return (


        <>
            {isSuccess ? <div className="">
                {/* {message} */}
                <div>Data Table  </div>
                <Client clients={data.clients} />

            </div> : <div>error</div>
            }
        </>

    );
}



// {
//     lastName: 'Lartey',
//     email: 'dynamo.joey@gmail.com',
//     timestamp: Timestamp { seconds: 1650984830, nanoseconds: 990000000 },
//     firstName: 'Joel',
//     phone: '+233265274457',
//     campus: '',
//     city: 'Haatso'
//   }

// type ClientDetail = {
//     firstName: string,
//     lastName: string,
//     phone: string,
//     campus: string,
//     city: string,

// }

const fetchAllClients = async () => {
    const response = await axios.get('api/clients/getAll',{
        data:{},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJLeWxpYW4iLCJlbWFpbCI6Imt5bGlhbkBnbWFpbC5jb20iLCJpZCI6IjYzZDEwMzgyZTQ0ODNkNTZlNjk2OTcwOSIsImlhdCI6MTY3NDc0ODQ4OCwiZXhwIjoxNjc0NzUyMDg4fQ.6DerU_rt4wPdmmmY7ZN8e9sXrv3JLZgEpCjFFmpIVVY'
        }
    
    });
    const clients = response.data;
    return clients;
}

export async function getStaticProps(context: any) {

    const Data = z.object({
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        campus: z.string(),
        city: z.string(),
        id: z.string(),
    })

    type DataType = z.infer<typeof Data>

    // console.log('called');

    let mydata: DocumentData[] = []
    // let normalData: DataType[] = [];

    // const todosCollection = collection(db, "clients");

    // const todosQuery = query(todosCollection);
    // let querySnapshot = await getDocs(todosQuery);

    // querySnapshot.docs.map((item) => {
    //     // console.log(item.data())
    //     let data = item.data()

    //     const res = Data.parse(data)

    //     normalData.push(res);
    // })


    //  console.log('mydata')
    //  console.log(querySnapshot.docs)

    // console.log('normal data')
    // console.log(normalData);

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery<IClient>(["getClient"], fetchAllClients,);



    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
        // revalidate: 10000000000
        // notFound:true
    }
}