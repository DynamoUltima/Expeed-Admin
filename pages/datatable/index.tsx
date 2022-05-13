import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps, PreviewData } from "next";
import { type } from "os";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../firebase/clientApp";
import Clients from "./clients";
import { z } from "zod"

function index({ message }: { message: DocumentData[] }) {
    console.log(message);
    return (
        <>
            <div className="">
                {/* {message} */}
                <div>Data Table  </div>
                <Clients super={message} />

            </div>
        </>

    );
}

export default index;
// {
//     lastName: 'Lartey',
//     email: 'dynamo.joey@gmail.com',
//     timestamp: Timestamp { seconds: 1650984830, nanoseconds: 990000000 },
//     firstName: 'Joel',
//     phone: '+233265274457',
//     campus: '',
//     city: 'Haatso'
//   }

type ClientDetail = {
    firstName: string,
    lastName: string,
    phone: string,
    campus: string,
    city: string,

}

export async function getStaticProps(context: any) {

    const Data = z.object({
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        campus: z.string(),
        city: z.string(),
    })

    type DataType = z.infer<typeof Data>

    console.log('called');

    let mydata: DocumentData[] = []
    let normalData: DataType[] = [];

    const todosCollection = collection(db, "clients");

    const todosQuery = query(todosCollection);
    let querySnapshot = await getDocs(todosQuery);
    const result: QueryDocumentSnapshot[] = [];
    // querySnapshot.forEach((snapshot) => {

    //     let data = snapshot.data()
    //     // console.log(data)
    //     const res = Data.parse(data)
    //     // result.push(snapshot);
    //     // mydata.push(snapshot.data());
    //     normalData.push(res);
    //     // storeData.current.push(snapshot.data())
    // });
    querySnapshot.docs.map((item) => {
        // console.log(item.data())
        let data = item.data()
        const res = Data.parse(data)
        
        normalData.push(res);
    })


    //  console.log('mydata')
    //  console.log(querySnapshot.docs)

    // console.log('normal data')
    // console.log(normalData);



    return {
        props: { message: normalData },
        // notFound:true
    }
}