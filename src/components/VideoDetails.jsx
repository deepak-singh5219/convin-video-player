import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { useSelector } from "react-redux";



const VideoDetails = () => {
    const [video, setVideo] = useState();
    const [relatedVideos,setRelatedVideos] = useState([]);
    const { id,videoId } = useParams();
    const { setLoading, selectHistoryCards } = useContext(Context);
    const buckets = useSelector(state => state.buckets);

    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id,buckets]);

    const fetchVideoDetails = async () => {
        setLoading(true);
        const bucketIndex = buckets?.findIndex((bucket) => bucket.id === id);
        const bucketCards = buckets[bucketIndex]?.cards;
        const cardIndex = bucketCards?.findIndex((card) => card.id === videoId);
        const playCard = bucketCards[cardIndex];
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        console.log(currentTime);
        selectHistoryCards(playCard,currentDate,currentTime);
        await setVideo(playCard);
        setLoading(false);
    };

    const fetchRelatedVideos = () => {
        setLoading(true);
        const bucketIndex = buckets?.findIndex((bucket) => bucket.id === id);
        const bucketCards = buckets[bucketIndex]?.cards;
        const filterCards = bucketCards?.filter(bucketCard => bucketCard.id!==videoId);
        setRelatedVideos(filterCards);
        setLoading(false);
    };

    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={(video?.redirectLink)?(video?.redirectLink):'https://www.youtube.com/watch?v=mBqQPxQLSfc'}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    
                </div>
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.map((relatedVideo) => {
    
                        return (
                            <SuggestionVideoCard
                                id={id}
                                key={relatedVideo?.id}
                                video={relatedVideo}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;
