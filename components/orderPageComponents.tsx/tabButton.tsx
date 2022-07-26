import { useEffect } from "react";

const TabButton = ({ selected , index, title}: { selected: boolean,index?:number,title?:string }) => {
    // useEffect(()=>{

    // },[index])
    return (
        <>
            <span className="pr-5">
                <button
                    className={
                        selected ? 'border-b-2 border-indigo-500 text-indigo-500 ' : ' text-black  '
                    }
                >
                    {title}
                </button>
            </span>
        </>

    );
}

export default TabButton;