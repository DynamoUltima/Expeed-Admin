const AccordionSubTile = () => {

    return (
        <div>
            <div className='flex flex-row items-center justify-between p-4  bg-blue-200 hover:bg-white rounded-xl'>

                {/* Person name */}
                <div className='flex flex-row items-center  space-x-4'>
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

                    <div className=''> $ 15.00</div>

                    <div>University of Ghana</div>

                    <div> Accounting</div>
                </div>



                <div className='space-x-2'>
                    <button

                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Accept
                    </button>

                    <button

                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>

    );
}

export default AccordionSubTile;