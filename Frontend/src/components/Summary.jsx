import { React, useState } from "react";
import { X } from "lucide-react";
import Loading from "./Loading";
import Markdown from 'react-markdown';

function Summary({summary, showSum, setShowSum, sumLoad}) {
    return (
        <div className="w-full mt-4 shadow-xl rounded-lg bg-white px-5 py-2">
            <div className="flex w-full justify-end mb-3 max-md:justify-center">
                <div className="max-md:p-0 max-md:m-0 ml-auto pl-10 w-[70%] text-left flex items-center justify-between">
                    <div className="p-2 inline-flex items-center text-white bg-linear-to-r  from-sky-500 via-30% to-emerald-500 to-90%  justify-center min-w-[140px] h-10 px-4 text-lg font-bold rounded-lg " >
                        Summary of video
                    </div>
                    <div className=" hover:opacity-90 opacity-65 transition cursor-pointer" onClick={() => setShowSum(!showSum)}>
                        <X />
                    </div>
                </div>
            </div>

            {sumLoad ?
                <div className="h-full flex items-center justify-center min-h-screen">
                    <Loading />
                </div>
                :
                <div className="text-left [&_ul]:list-disc [&_ul]:pl-6 opacity-85" >
                    <Markdown >
                        {summary}
                    </Markdown>
                </div>
            }
        </div>
    )
}

export default Summary