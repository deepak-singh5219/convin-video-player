import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import { useSelector,useDispatch } from "react-redux";
import { addCard, deleteMultipleCards, setInitialData } from "../Redux/Actions/actions";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-hot-toast";
import SelectCategory from "./SelectCategory";
import axios from "axios";








const Feed = () => {
    const { loading, setLoading, fetchDatabaseData, selectionMode, toggleSelection, setSelectedIds, selectedIds } = useContext(Context);
    const buckets = useSelector(state => state.buckets);
    const [videos,setVideos] = useState([]);
    
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        setTimeout(() => {
            updateData(); 
        }, 1000);
        
        const bucketIndex = buckets.findIndex(bucket => bucket.id === id);
        if(buckets.length>0)
        setVideos(buckets[bucketIndex]?.cards);
    }, [id,buckets]);

    useEffect(() => {
        fetchDatabaseData();
    },[]);


    const updateData = async () => {
       try {
        await axios.put('https://convin-video-player-api.onrender.com/updateBuckets', {"buckets":JSON.stringify(buckets)},
        {
            headers: {
                'Content-Type': 'application/json'
              }
        })
       } catch (error) {
        console.log(error); 
       }

    }

    
    const addNewCard = () => {
        if(!id){
            toast.error('No category Selected!!')
            return;
        }
        const title = prompt("Enter Card Title");
        const redirectLink = prompt("Enter Video Link");
        const thumbnailLink = prompt("Enter thumbnail Link(optional)");
        if(title!=="" && redirectLink!=="")
        {
            const card = {
                title,redirectLink,thumbnailLink,
                id:uuidv4()
            }
            dispatch(addCard(id,card));
            return;
        }
        toast.error('Data Missing!');
        
    }

    const removeMultipleCards = () => {
          const cnf = window.confirm(`Delete ${selectedIds.length} items?`);
          if(cnf){
            dispatch(deleteMultipleCards(id,selectedIds));
            setSelectedIds([]);
            toggleSelection();
            return;
          }
          toast.error('Cards not deleted!');
    }

    return (
        <div className="flex flex-row h-[calc(100%-56px)] relative">
            <LeftNav />
            
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className='flex md:flex-row flex-col items-center justify-between mx-12 my-4'>
            <button
              onClick={addNewCard}
              type="button"
              class="inline-block m-2 rounded bg-green-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
              Add New Card
           </button>
           <button
             onClick={removeMultipleCards}
             type="button"
             class={`${selectionMode?"":"hidden"} m-2 inline-block rounded bg-red-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white`}>
             Delete All
            </button>
           <button
             onClick={toggleSelection}
             type="button"
             class={`${selectionMode?"hidden":""} inline-block rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white`}>
             Select Cards
            </button>
            <button onClick={toggleSelection} type="button" class={`${selectionMode?"":"hidden"} bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}>
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                    </div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                {!loading &&
                        videos?.map((video) => {
                            return (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            );
                        })}
                </div>

                <div className={`${selectionMode?"":"hidden"} w-3/4 fixed bottom-2`}>
                    <SelectCategory/>
                </div>
            </div>
        </div>
    );
};

export default Feed;
