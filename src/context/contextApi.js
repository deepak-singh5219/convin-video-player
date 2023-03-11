import React, { createContext, useState, useEffect } from "react";
export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [selectedIds,setSelectedIds] = useState([]);
    const [selectionMode,setSelectionMode] = useState(false);
    const [moveCategoryId,setMoveCategoryId] = useState('');
    const [historyCards,setHistoryCards] = useState([]);


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
                historyCards
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
