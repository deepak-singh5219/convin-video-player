import React from "react";
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteBucket, editBucket } from "../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";




const LeftNavMenuItem = ({ text,bucket, type, icon, className, action }) => {
    const dispatch = useDispatch();
    const editCategory = () => {
        const name = prompt('Enter New Name');
        if(name)
        {
            const updatedBucket = {
                name,
                id:bucket.id,
                cards:bucket.cards
            }
        dispatch(editBucket(bucket.id,updatedBucket));
        return;    
        }
        toast.error('No Title Entered!');
    }

    const deleteCategory = () => {
        const cnf = window.confirm("Are You Sure?");
        if(cnf)
        {
            dispatch(deleteBucket(bucket.id));
            return;
        }
        toast.error('Category not deleted!');

    }
    return (
        <div
            className={
                "text-white text-sm cursor-pointer h-10 flex items-center justify-between px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
                className
            }
            onClick={action}
        > 
          <div className='flex items-center justify-center'>
            <span className="text-xl mr-5">{icon}</span>
            <p>{text}</p>
          </div>
            
            <div className={`flex ${(type==="custom" || type==="history")?"hidden":""}`}>
        <span onClick={editCategory} className='p-1 text-sm rounded-full hover:bg-slate-700 text-white'><BiEditAlt/></span>
        <span onClick={deleteCategory} className='p-1 text-sm rounded-full hover:bg-slate-700 text-white'><AiFillDelete/></span>
      </div>
        </div>
    );
};

export default LeftNavMenuItem;
