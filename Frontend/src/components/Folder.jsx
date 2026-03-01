import React, { useEffect, useRef, useState } from "react";
// import reactLogo from '../assets/download.jpeg'
import {EllipsisVertical,FolderOpen } from 'lucide-react';

import 'react-circular-progressbar/dist/styles.css';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function Folder({ Fname, Fid, Progress, VideoCnt, DeleteFolder}) {
  const modelRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: Fid });
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e) {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler);
  }, [])

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef}
      style={style}
      className="relative cursor-pointer"
    >
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4 w-full max-md:flex-col max-md:w-full max-md:pb-1">
        <div className="flex text-left w-auto gap-5 max-md:w-full">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing rounded-full bg-green-100 size-[54px] flex items-center justify-center">
        
            <FolderOpen color="#34C759" />

          </div>
          <div
            onClick={() => navigate(`/folder/${Fname}/${Fid}`)}
            className="w-[70%]"
          >
            <h1 className="text-2xl font-medium hover:text-blue-500 transition">{Fname}</h1>
            <p>{VideoCnt} videos</p>
          </div>
        </div>


        <div className="flex items-center gap-5 max-md:gap-20 max-md:w-full max-md:flex max-md:justify-between max-md:mt-2" >
          <div className="max-md:w-120">
            <ProgressBar Progress={Progress}/>
          </div>
          <button className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
          >
            <EllipsisVertical />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div ref={modelRef} className="absolute right-4 top-16 bg-white shadow-lg rounded-md w-32 py-2 z-20 max-md:top-25">
          <button
            className="py-2 w-full hover:bg-gray-100 font-semibold"
          // onClick={(e) => {
          //   e.preventDefault();
          //   setMenuOpen(false);
          // }}
          >
            Re-Name
          </button>
          <button
            className="py-2 w-full hover:bg-red-100 hover:text-red-600 font-semibold"
            onClick={() => {
              DeleteFolder(Fid);
              setMenuOpen(false);
            }}
          >
            Delete Folder
          </button>
        </div>
      )}
    </div>
  )
}

export default Folder;