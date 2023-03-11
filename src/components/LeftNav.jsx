import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/contextApi";
import { v4 as uuidv4 } from 'uuid';
import { addBucket } from "../Redux/Actions/actions";
import { useSelector,useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";



const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu } =
        useContext(Context);
        const buckets = useSelector(state => state.buckets);    

    const dispatch = useDispatch();    
    const addNewCategory = () => {
            const name = prompt("Enter Bucket Name");
            if(name)
            {
                dispatch(addBucket({name, type:"category", cards:[], id:uuidv4()}));
                return;
            }
            toast.error('Name Missing!');
            
        }

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectedCategory(name);
            case "home":
                return setSelectedCategory(name);
            case "menu":
                return false;
            case "custom":
                {
                    addNewCategory();
                    return setSelectedCategory(name);    
                }
            case "history": return setSelectedCategory(name);    
            default:
                break;
        }
    };

    const addNewButton = { name:"Add New Category", icon:<FiEdit/>, type:"custom", divider:true}
    const historyButton = { name:"History", icon:<AiOutlineHistory/>, type:"history", divider:true}

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
                mobileMenu ? "translate-x-0" : ""
            }`}
        >
            <div className="flex px-5 flex-col">
            <React.Fragment>
                            <LeftNavMenuItem
                                text={addNewButton.name}
                                icon={addNewButton.icon}
                                type={addNewButton.type}
                                action={() => {
                                    clickHandler(addNewButton.name, addNewButton.type);
                                }}
                                className={`${
                                    selectedCategory === addNewButton.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                            {addNewButton.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>

                { 
                    buckets?.map((bucket) => {
                        return (
                            <React.Fragment key={bucket.id}>
                            <LeftNavMenuItem
                                text={bucket.name}
                                icon={<BiCategoryAlt/>}
                                bucket={bucket}
                                action={() => {
                                    clickHandler(bucket.name, bucket.type);
                                    navigate(`/category/${bucket.id}`);
                                }}
                                className={`${
                                    selectedCategory === bucket.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                        
                        </React.Fragment>

                        
                        
                        )
                    })
                }    

                 <React.Fragment>
                            <LeftNavMenuItem
                                text={historyButton.name}
                                icon={historyButton.icon}
                                type={historyButton.type}
                                action={() => {
                                    clickHandler(historyButton.name, historyButton.type);
                                    navigate(`/history`);
                                }}
                                className={`${
                                    selectedCategory === historyButton.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                            {historyButton.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
    
                <div className="text-white/[0.5] mt-12 text-[12px]">
                Convin Frontend Assignment
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
