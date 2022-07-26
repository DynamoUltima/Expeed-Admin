import { useMemo, useState } from "react";
import { Column, HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TableInstance, TablePropGetter, TableProps, TableState, useGlobalFilter, useSortBy, useTable, } from 'react-table';
import GlobalFilter from "../globalFilter";

const Order = () => {

    const [products, setProducts] = useState([]);
    const datas = useMemo(() => ([
        {

            "category": "Bid",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 1,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": "Project work",
            "rating": { rate: 3.9, count: 120 },
            "title": "1 week"
        },
        {

            "category": "delivered",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 2,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": "Thesis",
            "rating": { rate: 3.3, count: 120 },
            "title": "4 days"
        },
        {

            "category": "delivered",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 3,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": "Assignment",
            "rating": { rate: 3.3, count: 120 },
            "title": "3 days"
        },
        {

            "category": "Pending",
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 4,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": "Assignment",
            "rating": { rate: 3.3, count: 120 },
            "title": "2 days"
        }
    ]), []);

    const isEven = (idx: number) => idx % 2 === 0

    const productData: Array<any> = useMemo(() => [...products], [products])
 

    const columns: any = useMemo(() => ([
        {
            Header: "OrderID",
            accessor: "id"
        }, {
            Header: "Title",
            accessor: "price"
        },
        {
            Header: "Duration",
            accessor: "title"
        },
        {
            Header: "State",
            accessor: 'category'
        }

    ]), [])


    const productColumns: Array<Column> = useMemo(
        () => products[0]
            ? Object.keys(products[0])
                // .filter((key) => key !== "id")
                .map((key) => {


                    if (key  === "id")
                        return {
                            Header: key,
                            accessor: key,
                            Cell: ({ value }) => <img src={value} alt="image" />,
                            maxWidth: 70,


                        }

                    return { Header: key, accessor: key };



                    // return { Header: key, accessor: key };


                })
            : [],
        []
    )

    // const tableHooks = (hooks: any) => {
    //     hooks.visibleColumns.push((columns: any) => [
    //         ...columns,
    //         {
    //             id: "Edit",
    //             Header: "Delete",
    //             Cell: ({ row }: any) => (
    //                 <button onClick={() => deleteTodo(row.values.id)} className="pl-4  pr-4 pt-2 pb-2 text-black rounded-md bg-red-300 hover:bg-red-200 transition-colors">
    //                     Delete
    //                 </button>
    //             ),

    //         },

    //     ])

    // }
    // setProducts(datas)

    const tableInstance: any = useTable({ columns: columns, data: datas }, useGlobalFilter, useSortBy,);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state, allColumns, getToggleHideAllColumnsProps } = tableInstance;




    return (
        <>
            <div className=' '>
                {/* <span>{message}</span> */}
                {/* {clients.map((client)=>(<div key={client}>{client}</div>))} */}



                <>
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
                    {/* <div className='flex'>
                    {
                        allColumns.map((column:any) =>(
                            <div key={column.id}>
                                <label >
                                    <input type={'checkbox'} value='false'  {...column.getToggleHiddenProps()}/>
                                    {column.Header}

                                </label>
                            </div>
                        ))
                    }
                </div> */}
                    <div className='overflow-x-auto '>
                        <table className='table-fixed text-base text-gray-900'  {...getTableProps()}>
                            <thead className='p-2'>
                                {headerGroups.map((headerGroup: { id: React.Key | null | undefined; getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; },) => (

                                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className='border shadow-inner'>
                                        {headerGroup.headers.map((column) => (

                                            <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())} className="border  p-2" >
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}

                                                {/* {
                                                    column.id=="id"?
                                                         <input type={'checkbox'}  {...column.getToggleHiddenProps()}/> :<></>
                                                    
                                                } */}


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
                                    return <tr key={row.id} {...row.getRowProps()} className={isEven(idx) ? "bg-green-400 bg-opacity-10  rounded-3xl shadow-lg hover:bg-green-600 hover:bg-opacity-10  " : "rounded-3xl shadow-lg hover:bg-slate-500 hover:bg-opacity-10"}>
                                        {row.cells.map((cell, idx) => (<td key={idx} {...cell.getCellProps()} className='border   p-5 '>
                                            {cell.render("Cell")}
                                        </td>
                                        ))}


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

export default Order;