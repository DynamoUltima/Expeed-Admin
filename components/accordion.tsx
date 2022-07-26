import React, { useState } from "react";
import AccordionUI from "./accordionUI";

const Accordion = () => {
    const [Index, setIndex] = useState(false);

    const data = [
        {
            id: 1,
            question: "What is Next.Js ?",
            answer: "The React Framework for Production",
        },
        {
            id: 2,
            question: "What is Tailwindcss ?",
            answer:
                "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
        },
        {
            id: 3,
            question: "What is art ?",
            answer:
                " a visual object or experience consciously created through an expression of skill or imagination.",
        },
    ];

    return (
        <div className="flex flex-col  border-2 justify-center items-center md:mt-2 md:mx-4 rounded-xl h-auto py-2 ">
            {data.map((data) => {
                return (
                    <AccordionUI
                        key={data.id}
                        title={data.question}
                        Id={data.id}
                        Index={Index}
                        setIndex={setIndex}
                    >
                        {data.answer}
                    </AccordionUI>
                );
            })}
        </div>
    );
};
export default Accordion;