import axios from "axios";
import React,{ createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialData } from "../Redux/Actions/actions";


export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [selectedIds,setSelectedIds] = useState([]);
    const [selectionMode,setSelectionMode] = useState(false);
    const [moveCategoryId,setMoveCategoryId] = useState('');
    const [historyCards,setHistoryCards] = useState([]);
    const [fetchStatus,setFetchStatus] = useState(false);
    const dispatch = useDispatch();

    const toggleSelection = () => {
        setSelectionMode(!selectionMode);
    }

    const selectCards = (checked,id) => {
        if(!checked){
            setSelectedIds(
                [...selectedIds,id]
            )
            return;
        }
        setSelectedIds(selectedIds.filter(_id => _id!==id ));   
    }

    const selectHistoryCards = (card,date,time) => {
        const historyCard = {
            card,date,time
        }
        setHistoryCards(
            [...historyCards,historyCard]
        )
    }

    const fetchDatabaseData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://convin-video-player-api.onrender.com/buckets');
            const dbBuckets = JSON.parse(res.data.bucketDocument.buckets);
            dispatch(setInitialData(dbBuckets));
            setFetchStatus(true);
            setLoading(false);
         } catch (error) {
            console.log(error);  
         }
    }

    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
                selectedIds,
                selectionMode,
                toggleSelection,
                selectCards,
                setSelectedIds,
                moveCategoryId,
                setMoveCategoryId,
                selectHistoryCards,
                historyCards,
                fetchDatabaseData,
                fetchStatus
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
