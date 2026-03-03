import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import api from "../service/api.js";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { NotebookText } from "lucide-react";
import TimeStampNotes from "../components/TimestampNotes";
import Quizes from "../components/Quizes";
import Summary from "../components/Summary";

function getYoutubeId(url) {
  if (!url) return null;
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function VideoPlayer() {
  const [video, setVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [showSum, setShowSum] = useState(false);
  const [showQues, setShowQues] = useState(false);
  const [sumLoad, setSumLoad] = useState(false);
  const [quizLoad, setQuizLoad] = useState(false);
  const [summary, setSummary] = useState("");
  const [Quiz, setQuiz] = useState("");
  const { Fid, id } = useParams();
  
  const playerRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  async function getVideo() {
    try {
      
      const res = await api.get(`/video/videoPlayer/${id}`)
      
      //console.log(res.data);
      setVideo(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getVideo();
  }, [])
  
  const handleSummaryClick = async (url) => {
    const vid = getYoutubeId(url);
    setSumLoad(true);
    try {
      setShowSum(!showSum);
      if (!showSum) {
        const res = await api.post(`/ai/transcript`, {url, vid});
        setSummary(res.data);
        console.log(res.data);
        setSumLoad(false);
      }
    } catch (error) {
      console.log(error.message);
      setSumLoad(false);
      setShowSum(false);
    }
  }

  const handleQuizClick = async (url) => {
    const vid = getYoutubeId(url);
    setQuizLoad(true);
    try {
      setShowQues(!showQues);
      if (!showQues) {
        const res = await api.post(`/ai/quiz`, { url, vid});
        setQuiz(res.data);
        console.log(res.data);
        setQuizLoad(false);
      }
      //console.log(res.data);
    } catch (error) {
      console.error(error);
      setQuizLoad(false);
      setShowQues(false);
    }
  }

  return (
    <div className="flex flex-col items-center shadow-lg rounded-lg h-full min-h-screen bg-[#fefefe]">
      <div className="w-full mb-5">
        <NavBar name={video.title}></NavBar>
      </div>

      <div className="w-full px-7 mb-5">
        <div className="w-full bg-white shadow-2xl rounded-2xl">
          <div className="flex w-full px-5 py-5 gap-1 items-center max-md:flex-col">
            <div className="mt-4 z-50 w-[73%] h-[90vh] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-md:w-full max-md:h-[20vh]">
              <ReactPlayer
                ref={(player) => {
                  if (player) playerRef.current = player;
                }}
                src={video.url}
                controls
                width="100%"
                height="100%"
                onTimeUpdate={() => {
                  const player = playerRef.current;
                  setPlayedSeconds(player.currentTime);
                  //console.log("seconds:", player.currentTime);
                }}
              />
            </div>
            <div className="mt-5 flex w-[27%] h-[90vh] items-center justify-center pt-0.5 pb-2 px-2 shadow-2xl border-2 rounded-2xl max-md:w-full max-md:h-[30vh]">
              <TimeStampNotes timestamp={playedSeconds} playerRef={playerRef}></TimeStampNotes>
            </div>
          </div>
          <div className=" w-full flex justify-around flex-wrap h-80 pl-20 pb-20 pt-5 pr-20 max-md:p-5">
            <div
              className="cursor-pointer w-[46%] h-full shadow-2xl flex flex-col justify-center items-center rounded-xl active:bg-gray-100 max-md:justify-start max-md:pt-2.5"
              onClick={() => handleSummaryClick(video.url)}>
              <div className="flex flex-col justify-center items-center">
                <div className="rounded-full bg-gray-200 size-20 flex items-center justify-center mb-2">
                  <NotebookText size={45} color="green" />
                </div>
                <div className="mt-2 font-bold text-xl pb-2">Summarize Video</div>
                <p className="opacity-40 font-medium">Get an AI generated summary of this video</p>
              </div>
            </div>

            <div
              className="cursor-pointer w-[46%] h-full shadow-2xl flex flex-col justify-center items-center rounded-xl active:bg-gray-100 max-md:justify-start max-md:pt-2.5"
              onClick={() => handleQuizClick(video.url)}>
              <div className="flex flex-col justify-center items-center">
                <div className="rounded-full bg-green-200 size-20 flex items-center justify-center mb-2 text-6xl font-bold text-green-600">
                  ?
                </div>
                <div className="mt-2 font-bold text-xl pb-2">Generate Quiz</div>
                <p className="opacity-40 font-medium">Generate Quiz to learn more about topic</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col">
          {showSum ?
            <Summary summary={summary} showSum={showSum} setShowSum={setShowSum} sumLoad={sumLoad} />
            : null
          }

          {showQues ?
            <Quizes Quiz={Quiz} showQues={showQues} setShowQues={setShowQues} quizLoad={quizLoad} />
            : null
          }
        </div>
      </div>


    </div>
  );
}

export default VideoPlayer;
