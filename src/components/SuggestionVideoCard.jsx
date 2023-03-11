import React from "react";
import { Link } from "react-router-dom";


const SuggestionVideoCard = ({ video,id }) => {
    return (
        
            <div className="flex mb-3">
                <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                <Link to={`/category/${id}/video/${video.id}`}>
      <img
        class="rounded-t-lg w-full"
        src={video.thumbnailLink?(video.thumbnailLink):'https://mobiletracking.app/wp-content/uploads/2021/01/Photo-Video-Captured.jpg'}
        alt="" />
      </Link>
                </div>
                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                        {video?.title}
                    </span>
                </div>
            </div>
    );
};

export default SuggestionVideoCard;
