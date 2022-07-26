import Accordion from "../components/accordion";
import { Tab } from '@headlessui/react'
import { Fragment } from "react";
import Bid from "../components/orderPageComponents.tsx/bid";
import Order from "../components/orderPageComponents.tsx/order";

const OrderPage = () => {

    let tabData = [{ tabHeading: 'Tab 1 ', body: <Bid /> }, { tabHeading: 'Tab 2 ', body: <div>2</div> }, { tabHeading: 'Tab 3 ', body: <div>3</div> }]
    return (

        <div className="flex flex-col  h-screen overflow-auto ">

            <p className="text-xl">Orders</p>
            <Tab.Group>
                <Tab.List>
                    <Tab as={Fragment} >{({ selected }) => (
                        <span className="pr-5">
                            <button
                                className={
                                    selected ? 'border-b-2 border-indigo-500 text-indigo-500  ' : ' text-black  '
                                }
                            >
                                Bids
                            </button>
                        </span>
                    )}
                    </Tab>


                    <Tab as={Fragment} >
                        {({ selected }) => (
                            <span className="pr-5">
                                <button
                                    className={
                                        selected ? 'border-b-2 border-indigo-500 text-indigo-500  ' : ' text-black  '
                                    }
                                >
                                    Orders
                                </button>
                            </span>
                        )}
                    </Tab>
                    <Tab>
                        {({ selected }) => (
                            <span className="pr-5">
                                <button
                                    className={
                                        selected ? 'border-b-2 border-indigo-500 text-indigo-500 ' : ' text-black  '
                                    }
                                >
                                    Tab 3
                                </button>
                            </span>
                        )}

                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel className={''}>
                        <Bid />

                    </Tab.Panel>

                    <Tab.Panel>
                      <Order/>
                    </Tab.Panel>

                    <Tab.Panel>
                        Content 3
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>




        </div>




    );
}

export default OrderPage;