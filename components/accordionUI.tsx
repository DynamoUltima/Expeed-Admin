

import React, { Component } from 'react';


const AccordionUI = ({ title, children, Id, Index, setIndex }: any) => {
    const handleSetIndex = (Id: any) => Index !== Id && setIndex(Id);

    return (
        <>

            <div
                onClick={() => handleSetIndex(Id)}
                className="flex group cursor-pointer w-3/4 mx-auto h-16 justify-between transition-all duration-500  items-center p-2 mt-2 rounded-md bg-white hover:bg-indigo-500 hover:shadow-lg focus:bg-indigo-500 "
            >
                <div className="flex group cursor-pointer">
                    <div className="text-indigo-500 font-semibold pl-10 group-hover:text-white">
                        {title}
                    </div>
                </div>
                <div className="flex items-center justify-center pr-10">
                    {Index !== Id ? (
                     
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce group-hover:text-white text-indigo-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    ) : (
                     
                        <svg onClick={() => handleSetIndex(false)}  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-white text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
            </div>

            {Index === Id && (
                <div className="bg-indigo-100 pl-10  font-semibold text-indigo-500 w-3/4 h-auto  rounded-md p-4 border-l-2 border-blue-300 mb-2 ">
                    {children}
                </div>
            )}
        </>
    );
};

export default AccordionUI;