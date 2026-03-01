import api from "../service/api.js";
import { CirclePlus, DeleteIcon, Edit2, Edit2Icon, SquarePen, Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function TimeStampNotes({timestamp, playerRef}) {
    const { fid, id} = useParams();
    const [istime, setIsTime] = useState(false);
    const [note, setNote] = useState("");
    const [list, setList] = useState([]);

    const handleAdd = async(e) => {
        e.preventDefault();
        
        const found = list.filter((lis) => lis.time == Math.floor(timestamp));
        //console.log(found);
        if(note.length > 1 && found.length == 0){
            //console.log(note.length);
            try{
                const tid = uuidv4()
                const res = await api.post("/notes", 
                    {id: tid, item: note, time: Math.floor(timestamp), vId: id, Fid: fid},
                    {withCredentials: true}
                )

                //console.log(res.data);
                setIsTime(false);
                setList([...list, {content:note, time:Math.floor(timestamp), id:tid}]);
                setNote(" ");
            }
            catch(error){
                //console.log(error);
            }
        }
        else alert("Enter some note or You alread store a note on this timeStamp");
    }

    const handleSeekTime = (time) => {
        if (!playerRef.current || time == null) return;
        //console.log("sekk to");
        playerRef.current.currentTime = time;
    }

    const handleDelete = async(nId) => {
        try {
            //console.log(nId);
            const res = await api.delete(`/notes/${nId}`);

            setList(prev => prev.filter((l) => nId != l.id))
            //console.log(res.data);
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        async function getNotes() {
            try {
                const res = await api.get(`/notes/${id}`);
                //console.log(res.data);
                setList(res.data);
            } catch (error) {
                //console.log(error);
            }
        }

        getNotes();
    }, [])
    
    return (
        <div className="w-full h-full items-center ">
            <h1 className="text-lg font-bold mb-2">Notes</h1>
            <div className="h-[87%] w-full overflow-y-auto text-left max-md:h-[75%]">
                <ul>
                    {list.map((l) => {
                        
                        return(
                            <li className="mb-3 flex items-start" key={uuidv4()} id={l.id}>
                                <div className="">
                                    <div
                                        className="pr-2 text-lg font-bold text-green-600 cursor-pointer hover:text-blue-700  hover:underline-offset-2 mb-1" 
                                        onClick={() => handleSeekTime(l.time)}
                                    >
                                        {Math.floor(l.time/3600)}:{Math.floor(l.time/60)}:{Math.floor(l.time%60)}
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="text-red-800 active:text-red-200 transition " onClick={() => handleDelete(l.id)}>
                                            <Trash2Icon size={16}/>
                                        </div>
                                        <div className="text-gray-800">
                                            <SquarePen size={16}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm opacity-90">
                                    {l.content}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex items-end gap-1">
                {istime && <div className="text-[#34C759] flex items-center">
                    {Math.floor(timestamp/3600)}:{Math.floor(timestamp/60)}:{Math.floor(timestamp%60)}
                </div>}
                <div className="flex w-full items-center">
                    <form action="" onSubmit={handleAdd} className="flex w-full">
                        <div className="w-full">
                            <input 
                                type="text" 
                                className="w-full outline-0 bg-gray-200 rounded-md px-1 py-1"
                                placeholder="write note" 
                                required
                                onClick={()=>setIsTime(true)}
                                onChange={(e) => setNote(e.target.value)}
                                value={note}
                            />
                        </div>
                        <button>
                            <div className="text-white active:text-green-300 transition ">
                                <CirclePlus fill="#34C759" size={30}/>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TimeStampNotes;