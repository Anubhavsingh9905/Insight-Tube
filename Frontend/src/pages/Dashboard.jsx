import { useEffect, useState } from "react";
import Folder from "../components/Folder";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import api from "../service/api.js";
import AddFolder from "../components/AddFolder";
import { CirclePlus, GraduationCap, FolderOpen, ArrowLeft, MoveLeft } from 'lucide-react';
import Logout from "../components/Logout";
import SearchFolder from "../components/SearchFolder";
import ProfileLogo from "../components/ProfileLogo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import NavBar from "../components/NavBar";


function Dashboard() {
    const {isLoggedIn, IsLoading} = useAuth();
    const [folders, setFolder] = useState([]);
    const [popUp, setPopup] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handlePopUp = () => {
        setPopup(!popUp)
    }

    const deleteFolder = async (Fid) => {
        //console.log(e);
        try {
            const response = await api.delete('/folder', {
                data: { Id: Fid }
            })
            
            setFolder(prev => prev.filter(f => f._id !== Fid));
            //console.log(response.data);
        } catch (error) {
            setError(`${error} __failed to delete folder`)
        }
    }

    const getFolderPos = (id) => folders.findIndex((f) => f._id == id);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        setFolder((prev) => {
            const oldPos = getFolderPos(active.id);
            const newPos = getFolderPos(over.id);

            const newFolder = arrayMove(prev, oldPos, newPos);


            async function reorder() {
                try {
                    const res = await api.put('/folder/reorder', {
                        newFolder
                    });

                    //console.log(res.data);
                } catch (error) {
                    //console.log(error);
                    return;
                }
            }

            reorder();

            //console.log(newFolder);
            return newFolder;
        })

    }

    useEffect(() => {
        async function getFolder() {
            try {
                const res = await api.get('/folder', {withCredentials: true})
                //console.log(res);
                setFolder(res.data);
            }
            catch (error) {
                setError("unable to fetch videos");
            }
        }
        getFolder();
    }, [])

    return (
        <div className="flex flex-col items-center bg-[#EBEBEB] shadow-lg rounded-lg h-full min-h-screen">
            <div className="mb-10 w-full">
                <NavBar></NavBar>
            </div>


            <div className="flex items-center gap-5 w-full pl-10">
                <GraduationCap size={35} className="max-md:hidden"/>
                <GraduationCap size={40} className="md:hidden"/>
                <h1 className="text-4xl font-bold flex text-left w-xl gap-4 ">Dashboard</h1>
            </div>

            <div className="w-full pl-10 flex justify-between items-center gap-5">
                <SearchFolder setQuery={setQuery}></SearchFolder>
                <h2 onClick={handlePopUp} className="cursor-pointer text-[#EBEBEB] h-15 pr-10"><CirclePlus size={60} fill="#34C759" strokeWidth={1.5} /></h2>
            </div>

            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >

                <div className="folder w-full pl-10 pr-10">
                    <SortableContext items={folders.map(f => f._id)} strategy={verticalListSortingStrategy}>
                        {
                            folders.filter((folder) => 
                                folder.name.toLowerCase().includes(query)
                            )
                            .map((folder) => {
                                //console.log(`${query}--->${folder.name.toLowerCase().includes(query)}`);
                                //console.log(`${folder.order} ${folder.name}  ${folder._id}`);
                                return <Folder key={folder._id} Fname={folder.name} Fid={folder._id} Progress={folder.progressPercentage} VideoCnt={folder.videoCnt}DeleteFolder={deleteFolder} />
                            })
                        }
                    </SortableContext>
                </div>
            </DndContext>
            {!folders.length &&
                <div className="flex flex-col items-center pt-15">
                    <FolderOpen size={70} color="#696767ff" className="pb-5" />
                    <h1 className="text-3xl font-bold">Start Your Learning Journey</h1>
                    <p className="text-xl font-medium py-3 text-[#6a6868]">Tap the '+' button to create your first <br />
                        subject and organize your learning.</p>
                </div>
            }

            {popUp && <AddFolder onClose={() => { handlePopUp() }} setFolder={setFolder} folders={folders}/>}
        </div>
    )
}

export default Dashboard;