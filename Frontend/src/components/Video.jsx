import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate, useParams } from "react-router-dom";
import api from "../service/api.js";

function Video({url, title, thumbnail, id, done, DeleteVideo}) {
    const [isChecked , setIsChecked] = useState(done);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
    const navigate = useNavigate();
    const Fid = useParams().id;

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    
    const handleCheck = (e) => {
        //console.log(e.target.checked);
        setIsChecked(e.target.checked);
        //console.log(e.target.checked);
        //console.log({isChecked});
        //console.log(Fid);
        //console.log({done});

        async function checkbox (){
            try{
                const res = await api.put('/video/done',{
                    isChecked,
                    id,
                    Fid
                });
                //console.log(res.data);
            }
            catch(error){
                //console.log(error);
            }
        }

        checkbox();
    }

    const contentStyle = {
        filter: isChecked ? 'grayscale(100%)' : 'none',
        transition: 'filter 0.3s ease-in-out',
    };
    
    const textStyle = {
        textDecoration:isChecked ? 'line-through 2px' : 'none',
        transition: 'filter 0.3s ease-in-out',
    }

    return(
        <div 
        ref={setNodeRef}
        style={style}
        className="relative flex m-4 rounded-lg bg-white shadow-lg w-full h-fit justify-between  max-md:flex-col"
        >
            <div 
            {...attributes}
            {...listeners}
            className="p-4 rounded-lg shadow-xl cursor-grab active:cursor-grabbing w-[30%] max-md:w-full">
                <img src={thumbnail} alt="No preview" style={contentStyle} className="w-fit h-fit object-cover rounded-lg max-md:w-fit max-md:h-fit" />
            </div>

            <div className="text-left w-[90%]">
                <div 
                onClick={() => isChecked ? "" : navigate(`/videoPlayer/${Fid}/${id}`)}
                style={textStyle}
                className= {isChecked ? "mt-3 p-4 font-bold cursor-not-allowed"
                    : "mt-3 p-4 font-bold hover:translate-y-1 hover:translate-x-3 hover:text-blue-700 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"}>
                    {title}
                </div>

                <div className={"mt-1 p-4"}>
                    <a href={url} className={""}>Open on youtube</a>
                </div>
            </div>
            
            <div className="w-[10%] flex flex-col justify-between items-center py-3 ">
                <div
                    onChange={handleCheck}
                    className="w-fit delay-10 duration-100 ease-in hover:scale-120 cursor-pointer max-md:top-[60%] max-md:left-[88%] max-md:absolute"
                >

                    <input type="checkbox" checked={isChecked} onChange={e => {}} style={{width:25, height:25}}/>
                </div>

                <div
                    onClick={() => {DeleteVideo(id)}}
                    className="w-fit transition delay-150 duration-300 ease-in-out hover:translate-y-2 hover:text-red-600 hover:scale-105 cursor-pointer max-md:top-[85%] max-md:left-[88%] max-md:absolute">
                    <Trash2 />
                </div>
            </div>
        </div>
    )
}

export default Video;