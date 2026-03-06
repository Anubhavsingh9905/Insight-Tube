import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../service/api.js";

function AddFolder({ onClose, setFolder, folders}) {
    const [Foldername, setFolderName] = useState("");

    const handleChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await api.post("/folder", 
                { name: Foldername }, 
                {withCredentials: true}
            )

            console.log(response.data);
            setFolder(prev => [...prev, response.data]);
            setFolderName("");
        } catch (error) {
            console.error(error);
            setError(`${error} ___failed to add folder`)
            // alert("Error", "Something went wrong."); 
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-40 max-md:px-2">
            <div className="mt-10 flex flex-col gap-5 text-black z-50">
                <button onClick={onClose} className="place-self-end cursor-pointer max-md:pr-4"><X size={30} /></button>

                <div className="bg-[#EBEBEB] rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl font-extrabold max-md:text-xl">ADD THE FOLDER</h1>
                    <p className="text-3xl font-bold max-w-md text-center max-md:text-sm">
                        Want to Learn how to Suceess and Erase Your Distraction
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={Foldername}
                            placeholder="Enter the folder name..."
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                        />
                        <button className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black text-white cursor-pointer ">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFolder;