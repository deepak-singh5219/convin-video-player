import React,{useState,useContext} from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useParams } from "react-router-dom";
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { deleteCard, editCard } from "../Redux/Actions/actions";
import { toast } from "react-hot-toast";
import { Context } from "../context/contextApi";
import { useEffect } from "react";








const VideoCard = ({ video }) => {
    const dispatch = useDispatch();
    const {selectionMode, selectCards} = useContext(Context);
    const [checked,setChecked] = useState(false);
    const {id} = useParams();
    
    const editVideoCard = () => {
        const title = prompt('Enter new title!');
        const redirectLink = prompt('Enter new video link!');
        const thumbnailLink = prompt('Enter new thumbnail link(optional)');
        
        const updatedCard = {
            title,redirectLink,thumbnailLink,
            id:video.id
        }

        dispatch(editCard(id,video.id,updatedCard));
    }

    const deleteVideoCard = () => {
        const cnf = window.confirm('Are you sure!');
        if(cnf)
        {
            dispatch(deleteCard(id,video.id));
            return;
        }  
    }

    return (
        
  <div class={`${(selectionMode && !checked)?"brightness-50":""} flex justify-center transform transition duration-500 hover:scale-105`}>
  <div
    class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
      <Link to={`/category/${id}/video/${video.id}`}>
      <img
        class="rounded-t-lg w-full"
        src={video.thumbnailLink?(video.thumbnailLink):'https://mobiletracking.app/wp-content/uploads/2021/01/Photo-Video-Captured.jpg'}
        alt="" />
      </Link>
      
    
    <div class="p-4 flex items-center justify-between w-full">
      <h5
        class="mb-1 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {video.title}
      </h5>
      <div class="mb-[0.125rem] block border-white min-h-[1.5rem] pl-[1.5rem]">
      <input
        onChange={() => {
            setChecked(!checked)
            selectCards(checked,video.id)
        }}
        class={`${selectionMode?"":"hidden"} relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent`}
        type="checkbox"
        value={checked}
        id="checkboxDefault" />
    </div>
      <div className='flex'>
        <span onClick={editVideoCard} className='p-2 text-lg rounded-full hover:bg-slate-700 text-white'><BiEditAlt/></span>
        <span onClick={deleteVideoCard} className='p-2 text-lg rounded-full hover:bg-slate-700 text-white'><AiFillDelete/></span>
      </div>
      
    </div>
  </div>
</div>
       
    );
};

export default VideoCard;
