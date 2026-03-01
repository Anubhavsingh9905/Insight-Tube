import { React, useState } from "react";
import { X } from "lucide-react";
import Loading from "./Loading";

function Quizes({Quiz, showQues, setShowQues, quizLoad}) {
    return (
        <div className="w-full mt-4 shadow-xl rounded-lg bg-white px-5 py-2 shrink-2">
            <div className="flex w-full justify-end mb-3 max-md:justify-center">
                <div className="max-md:p-0 max-md:m-0 pl-10 w-[71%] text-left flex items-center justify-between">
                    <div className="p-2 inline-flex items-center bg-[#34C759] text-white justify-center min-w-[140px] h-10 px-4 text-lg font-bold rounded-lg " >
                        Quiz of Video
                    </div>
                    <div className=" hover:opacity-100 opacity-50 transition cursor-pointer" onClick={() => setShowQues(!showQues)}>
                        <X />
                    </div>
                </div>
            </div>

            {quizLoad ?
                <div className="h-full flex items-center justify-center min-h-screen">
                    <Loading />
                </div>
                :
                <div className="text-left opacity-85">
                    <h1 className="mt-3 mb-3 text-xl font-bold underline text-green-600">Hover on Blur Part to Reveal Answer</h1>
                    {Quiz.quiz.map((item, index) => (
                        <div key={index} className="mb-5">
                            <h3 className="font-bold">{item.number}. {item.question}</h3>
                            {Object.entries(item.options).map(([key, value]) => (
                                <button key={key} className="flex flex-col p-2 text-left">
                                    {key}: {value}
                                </button>
                            ))}
                            <button className="p-2 mt-1.5 bg-gray-500 text-white font-bold text-sm rounded-lg blur-sm hover:blur-none cursor-pointer max-md:active:blur-none">Answer :-- {item.answer}</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Quizes;