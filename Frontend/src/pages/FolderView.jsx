import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CirclePlus } from 'lucide-react';
import api from "../service/api.js";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from "react";
import Video from "../components/Video";
import SearchVideo from "../components/SearchVideo";
import NavBar from "../components/NavBar";

function getYoutubeId(url) {
  if (!url) return null;
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

async function fetchYoutubeTitle(url) {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) throw new Error("oEmbed fetch failed");
    const data = await res.json();
    return data.title || null;
  } catch (err) {
    return null;
  }
}


function FolderView() {
  const [videosData, setVideosData] = useState([]);
  const [error, setError] = useState("");
  const [addVideoMenu, setAddVideoMenu] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");

  const { name, id } = useParams();

  const handleVideoMenu = () => {
    setAddVideoMenu(!addVideoMenu);
  }

  const handleChangeUrl = async (e) => {
    setUrl(e.target.value);
    const title1 = await fetchYoutubeTitle(e.target.value) || "No Title";
    setTitle(title1);
  }

  const handleChangeTitle = (e) => {
    //console.log(e.target.value);
    setTitle(e.target.value);
  }

  const getFolderPos = (id) => videosData.findIndex((v) => v._id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setVideosData((prev) => {
      const oldPos = getFolderPos(active.id);
      const newPos = getFolderPos(over.id);

      const newVideo = arrayMove(prev, oldPos, newPos);


      async function reorder() {
        try {
          const res = await api.put('/video/reorder', {
            newVideo
          });

          //console.log(res.data);
        } catch (error) {
          //console.log(error);
          return;
        }
      }

      reorder();

      //console.log(newVideo);
      return newVideo;
    })

  }

  useEffect(() => {
    async function getVideo() {
      try {
        const res = await api.get(`/video/${id}`)
        //console.log(id);
        setVideosData(res.data);
      }
      catch (error) {
        setError("unable to fetch videos");
      }
    }
    getVideo();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setAddVideoMenu(false);

    let vid = getYoutubeId(url);
    if (!vid) {
      setError("Invalid youtube url, please insert correct url");
      return;
    }

    // const Videotitle = title || await fetchYoutubeTitle(url) || "No Title";
    const thumbnail = vid
      ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
      : "";

    //console.log(thumbnail);
    try {
      const res = await api.post('/video', {
        newtitle: title,
        newurl: url,
        newthumbnail: thumbnail,
        Fid: id,
      })

      //console.log((res.data));
      setVideosData(prev => [...prev, res.data]);
      setUrl("");
      setTitle("");
    }
    catch (error) {
      setUrl("");
      setTitle("");
      setError(`${error} ___failed to add video`);
    }
  }

  const handleDelete = async (vid) => {
    //console.log(vid)
    try {
      const res = await api.delete(`/video/${vid}/${id}`);

      setVideosData(videosData.filter((v) => v._id !== vid));
      //console.log(res.data);
    } catch (error) {
      //console.log(error);
      setError(error);
    }
  }

  return (
    <div className=" relative flex flex-col items-center shadow-lg rounded-lg h-full min-h-screen bg-[#EBEBEB]">

      <div className="w-full"> 
        <NavBar name={name}></NavBar>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="w-full pl-10 h-15 flex justify-between items-center gap-5 mt-5">
        <SearchVideo setQuery={setQuery}></SearchVideo>
        <div className="cursor-pointer text-[#EBEBEB] pr-10 flex " onClick={handleVideoMenu}>
          <CirclePlus size={60} fill="#34C759" strokeWidth={1.5} />
        </div>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full pl-6 pr-15">
          <SortableContext items={videosData.map(v => v._id)} strategy={verticalListSortingStrategy}>
            {
              videosData
              .filter((video) =>
                video.title.toLowerCase().includes(query)
              )
              .map((video) => {
                return (
                  <Video key={video.url} url={video.url} title={video.title} thumbnail={video.thumbnail} id={video._id} done={video.checked} DeleteVideo={handleDelete} />
                )
              })
            }
          </SortableContext>
        </div>
      </DndContext>

      {!videosData.length &&
        <div className="flex flex-col items-center pt-20">
          <h1 className="text-3xl font-bold">Start Your Learning Journey</h1>
          <p className="text-xl font-medium py-3 text-[#6a6868]">Tap the '+' button to add your first <br />
            video and organize your learning.</p>
        </div>
      }

      {addVideoMenu &&
        <div className="absolute right-[8%] top-[20%] bg-white shadow-lg rounded-md w-1/3 p-3 z-20 border">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={url}
              placeholder="Enter youtube url to add videos"
              className="bg-gray-200 border w-full rounded-sm p-1 px-3 "
              onChange={handleChangeUrl}
            />
            <input
              type="text"
              value={title}
              placeholder="Enter Title of Video"
              className="bg-gray-200 border w-full rounded-sm p-1 px-3 mt-3"
              onChange={handleChangeTitle}
            />
            <button className="bg-[#34C759] p-1 mt-2 rounded-xl text-white w-full focus:bg-green-700" >Add</button>
          </form>
        </div>
      }
    </div>
  )
}

export default FolderView