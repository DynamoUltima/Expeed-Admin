import React, { useState } from 'react';
import { Row, useAsyncDebounce } from 'react-table';

interface globalFilter {preGlobalFilteredRows:Array<Row>,globalFilter: String,setGlobalFilter:(filterValue:any) => void}

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter ,
    setGlobalFilter
}:globalFilter) => {

    const count= preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);

    }, 600)
    return (
        <div className=' mb-6 mt-6 flex items-center'>
            <h2 className='text-xl text-gray-600  mr-6'>
                Search
            </h2>

            <input className='h-8 border-2 border-solid  border-green-50 outline-none  p-4 rounded-lg'
                value={`${value}` || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}

            />

        </div>

    );
}

export default GlobalFilter;