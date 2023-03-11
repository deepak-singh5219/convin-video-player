import React from 'react'
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Context } from '../context/contextApi';
import { toast } from 'react-hot-toast';
import { moveCards } from '../Redux/Actions/actions';






const SelectCategory = () => {
    const buckets = useSelector(state => state.buckets);
    const { selectedIds, setSelectedIds, moveCategoryId,setMoveCategoryId, toggleSelection } = useContext(Context);
    const {id} = useParams();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setMoveCategoryId(e.target.value);   
    }

    const handleSubmit = () => {
        const cnf = window.confirm(`Move ${selectedIds.length} cards?`);
        if(cnf)
        {
            dispatch(moveCards(id,moveCategoryId,selectedIds));
            setSelectedIds([]);
            toggleSelection();
            return;
        }
        toast.error('Move Unsuccessfull!');
    }
    
  return (
    
    <div className='flex bg-dark w-full items-center justify-between mt-12'>
<select onChange={handleChange} id="categories" class="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Select Category to Move</option>
  {
    buckets?.map(bucket => (bucket.id!==id)?(<option key={bucket.id} value={bucket.id}>{bucket.name}</option>):"")
  }
</select>
<button onClick={handleSubmit} type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Move Cards</button>
    </div>
    
  )
}

export default SelectCategory;