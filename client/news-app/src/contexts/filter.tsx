import { createContext,useContext,useState } from "react";
import React from "react";

type filterContextType={filter:string | null,setfilter:(filter:string | null)=>void}

type filterContextProviderProps={
    children:React.ReactNode
}

const filterContext=createContext<filterContextType>({} as filterContextType);

export const FilterContextProvider=({children}:filterContextProviderProps)=>{
    const [filter,setfilter]=useState<string | null>(null);
    return(
        <filterContext.Provider value={{filter,setfilter}}>
            {children}
        </filterContext.Provider>
    )
}

export const usefilterContext=()=>useContext(filterContext);