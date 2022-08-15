

import React, { Component } from 'react';
import AccordionSubTile from './accordionSubTile';


const AccordionUI = ({ title, children, Id, Index, setIndex }: any) => {
    const handleSetIndex = (Id: any) => Index !== Id && setIndex(Id);

    return (
        <>
            {/* {title} */}
            <div
                onClick={() => handleSetIndex(Id)}
                className="flex group cursor-pointer w-3/4 mx-auto h-16 justify-between transition-all duration-500  items-center p-2 mt-2 rounded-md bg-white hover:bg-indigo-500 hover:shadow-lg focus:bg-indigo-500 "
            >
                <div className="flex group cursor-pointer">
                    <div className="text-indigo-500 font-semibold pl-10 group-hover:text-white">
                        <div className='flex flex-row items-center space-x-2'>


                            <div>
                                Project Work
                            </div>




                            <div className="flex items-center justify-items-stretch">
                                <div className="w-8 h-8  ">
                                    <div className="group w-full h-full  rounded-full overflow-hidden  text-center bg-purple table cursor-pointer  bg-gray-300">
                                        {/* <span className="hidden group-hover:table-cell text-white font-bold align-middle">KR</span> */}
                                        {/* <Image src={personnel} alt="lovely avatar" className="bg-contain object-cover object-center w-full h-full visible group-hover:hidden" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-contain object-cover object-center w-full h-full visible group-hover:hidden text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                </div>

                                <div className="text-sm ml-4">Peter Parker</div>

                                <div className="border border-gray-400 p-1 rounded-r-full flex  items-center rounded-bl-full ml-4 ">
                                    <div className="w-2 h-2  ">
                                        <div className="group w-full h-full  rounded-full overflow-hidden  bg-purple table cursor-pointer  bg-red-500">
                                            {/* <span className="hidden group-hover:table-cell text-white font-bold align-middle">KR</span> */}
                                            {/* <div className="bg-red-500 "></div> */}
                                        </div>
                                    </div>

                                    <div className="p-1">Pending</div>

                                </div>
                            </div>

                            <div>
                                3 Weeks
                            </div>


                            <div>
                                15th Dec 2021
                            </div>



                        </div>

                    </div>
                </div>
                <div className="flex items-center justify-center pr-10">
                    {Index !== Id ? (

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce group-hover:text-white text-indigo-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    ) : (

                        <svg onClick={() => handleSetIndex(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-white text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
            </div>

            {Index === Id && (
                <div className="bg-indigo-100 pl-10  font-semibold text-indigo-500 w-3/4 h-auto  rounded-md p-4 border-l-2 border-blue-300 mb-2 ">
                    {/* {children} */}
                    {/* ji */}
                    <div className='grid grid-cols-1 space-y-1 '>

                        <AccordionSubTile />
                        <AccordionSubTile />



                    </div>

                </div>
            )}
        </>
    );
};

export default AccordionUI;