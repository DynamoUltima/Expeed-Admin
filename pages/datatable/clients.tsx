/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Column, HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TableInstance, TablePropGetter, TableProps, TableState, useGlobalFilter, useSortBy, useTable, } from 'react-table';
import GlobalFilter from '../../components/globalFilter';
import { db } from '../../firebase/clientApp';
import { GetServerSideProps, GetStaticProps, PreviewData } from 'next'
import { addDoc, collection, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, QuerySnapshot, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { ParsedUrlQuery } from 'querystring';





type details = {
    price: string,
    id: string,

}

const Clients = (props: { super: {}[] }) => {
    const [products, setProducts] = useState([]);
    // const [clients, setClients] = useState<DocumentData[]>([]);
    // const [fireData, setFireData] = useState<QuerySnapshot<DocumentData>>()


    //    let newdata= clients;
    // let mydata: [] = [...props.super]


    console.log('super')
    console.log(props.super);


    // console.log("--newdata---")

    // console.log(message);

    // let clientData: any[] = []

    // let mySnapshot: QuerySnapshot<DocumentData>
    // setProducts(clients)
    // console.log('clients')
    // console.log(products)



    // useEffect(() => {
    //     const fetchData = async () => {

    //         ///firebase Trial



    //         // const todosCollection = collection(db, "clients");

    //         // const todosQuery = query(todosCollection);
    //         // const querySnapshot = await getDocs(todosQuery);
    //         // const result: QueryDocumentSnapshot<DocumentData>[] = [];
    //         // querySnapshot.forEach((snapshot) => {
    //         //     result.push(snapshot);
    //         //     mydata.push(snapshot.data());
    //         //     // storeData.current.push(snapshot.data())
    //         // });
    //         // // if(mydata.length!=0){
    //         // //     storeData.current=mydata

    //         // // }

    //         // storeData.current = [...mydata];

    //         // setClients(storeData.current)








    //         // mySnapshot =querySnapshot;


    //         // setFireData(querySnapshot);
    //         //   setClients(mydata);

    //         // console.log('---result---');
    //         // console.log(result);
    //         // console.log('----querysnapshot-----');
    //         // console.log(querySnapshot);


    //         // console.log('---clients---');
    //         // // console.log(clients);
    //         // console.log(mydata)
    //         // console.log('------------------------------------------')


    //         // if(mydata.length!==0){
    //         //     setClients(mydata);

    //         // }


    //         // const response = await axios.get('https://fakestoreapi.com/products').catch((err) => console.log(err));

    //         // if (response) {
    //         //     const products = response.data;

    //         //     console.log("Products: ", products)
    //         //     setProducts(products);
    //         // }
    //     }

    //    // fetchData()




    //     // fireData?.forEach((snapshot)=>{

    //     //     mydata.push(snapshot.data());

    //     // })

    //     // console.log('---clients  outside---');

    //     // setClients(mydata);





    // }, []);

    // console.log("----clients log---")
    // console.log(mydata)

    // console.log('---store  outside---');
    // console.log(storeData.current);

    //  mydata =[...storeData.current];
    //  console.log("----clients log---")
    //  console.log(mydata);

    // setClients(storeData.current)

    const datas = useMemo(() => ([
        {

            "category": "men's clothing",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 1,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": 109.95,
            "rating": { rate: 3.9, count: 120 },
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fit"
        },
        {

            "category": "women's clothing",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 2,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": 109.95,
            "rating": { rate: 3.3, count: 120 },
            "title": "Fjallraven"
        }
    ]), []);

    const isEven = (idx: number) => idx % 2 === 0


    const columns = useMemo(() => ([
        {
            Header: "Id",
            accessor: "id"
        }, {
            Header: "Price",
            accessor: "price"
        }, {
            Header: "Title",
            accessor: "title"
        }

    ]), [])



    // const productData: Array<any> = useMemo(() => [...products], [products])

    const productData: Array<any> = useMemo(() => [...props.super], [props.super])

    // const productColumns: Array<Column> = useMemo(
    //     () => products[0]
    //         ? Object.keys(products[0])
    //             .filter((key) => key !== "rating")
    //             .map((key) => {

    //                 if (key === "image")
    //                     return {
    //                         Header: key,
    //                         accessor: key,
    //                         Cell: ({ value }) => <img src={value} />,
    //                         maxWidth: 70
    //                     }

    //                 return { Header: key, accessor: key };
    //             })
    //         : [],
    //     [products]
    // )
    // clientData =mydata;


    const productColumns: Array<Column> = useMemo(
        () => props.super[0]
            ? Object.keys(props.super[0])
                // .filter((key) => key !== "rating")
                .map((key) => {

                    if (key === "image")
                        return {
                            Header: key,
                            accessor: key,
                            Cell: ({ value }) => <img src={value} alt="image" />,
                            maxWidth: 70
                        }

                    return { Header: key, accessor: key };
                })
            : [],
        []
    )

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((columns: any) => [
            ...columns,
            {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }: any) => (
                    <button onClick={() => alert("Editing " + row.values.phone)} className="pl-4  pr-4 pt-2 pb-2 text-black rounded-md bg-green-300 hover:bg-green-200 transition-colors">
                        Edit
                    </button>
                )
            }
        ])

    }



    interface ExampleObject {


        columns: Array<Column>
        data: Array<any>
    }

    // const tableInstance = useTable<any>({ columns, data })
    const tableInstance:any = useTable({ columns: productColumns, data: productData }, useGlobalFilter, tableHooks, useSortBy)

    interface tableInstanceProps {
        getTableProps:(propGetter?: TablePropGetter<object> | undefined) => TableProps,
        getTableBodyProps:(propGetter?: TableBodyPropGetter<object> | undefined) => TableBodyProps,
        headerGroups: HeaderGroup<object>[],
        rows: Row<object>[],
        prepareRow:(row: Row<object>) => void,
        preGlobalFilteredRows:Array<Row>,
        setGlobalFilter:(filterValue:any) => void,
        state:TableState<object>,

    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance;


    return (
        <>
            <div className=' '>
                {/* <span>{message}</span> */}
                {/* {clients.map((client)=>(<div key={client}>{client}</div>))} */}

                <>
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
                    <div className='overflow-x-auto '>
                        <table className='table-fixed text-base text-gray-900'  {...getTableProps()}>
                            <thead className='p-2'>
                                {headerGroups.map((headerGroup: { id: React.Key | null | undefined; getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; },) => (

                                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className='border border-green-500'>
                                        {headerGroup.headers.map((column) => (

                                            <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())} className="border border-green-500 p-2" >
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}

                                            </th>
                                        ))}

                                    </tr>
                                )
                                )
                                }
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: { id: React.Key | null | undefined; getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }, idx: number) => {
                                    prepareRow(row)
                                    return <tr key={row.id} {...row.getRowProps()} className={isEven(idx) ? "bg-green-400 bg-opacity-10" : ""}>
                                        {row.cells.map((cell, idx) => (<td key={idx} {...cell.getCellProps()} className='border border-green-500 p-5'>
                                            {cell.render("Cell")}
                                        </td>))}


                                    </tr>
                                })}

                            </tbody>


                        </table>
                    </div>
                </>
            </div>

        </>
    );
}

export default Clients;


export const getServerSideProps: GetServerSideProps<{
    [key: string]: any;
}, ParsedUrlQuery, PreviewData> = async (context: any) => {

    return {
        props: { message: 'hello  after world' },
        notFound: true
    }
    // let mydata: DocumentData[] = []

    // console.log("pre rendered")
    // console.log(mydata)
    // let data="hello"



    // const todosCollection = collection(db, "clients");

    // const todosQuery = query(todosCollection);
    // const querySnapshot = await getDocs(todosQuery);
    // const result: QueryDocumentSnapshot<DocumentData>[] = [];
    // querySnapshot.forEach((snapshot) => {
    //     result.push(snapshot);
    //     mydata.push(snapshot.data());
    //     // storeData.current.push(snapshot.data())
    // });

    // const response = await axios.get('https://fakestoreapi.com/products').catch((err) => console.log(err));

    // if (response) {
    //     const products = response.data;

    //     console.log("Products: ", products)
    //     return  {
    //         props: {clients : products}
    //     }

    // }





}