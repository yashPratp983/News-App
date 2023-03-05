import { createContext,useContext,useState } from "react";
import React from "react";
type newsContextType={news:{by:string,id:number,score:number,time:number,title:string,type:string,url:string}[] | null,setNews:(news:{by:string,id:number,score:number,time:number,title:string,type:string,url:string}[] | null)=>void}

type newsContextProviderProps={
    children:React.ReactNode
}

const newsContext=createContext<newsContextType>({} as newsContextType);

export const NewsContextProvider=({children}:newsContextProviderProps)=>{
    const [news,setNews]=useState<{by:string,id:number,score:number,time:number,title:string,type:string,url:string}[] | null>(null);
    return(
        <newsContext.Provider value={{news,setNews}}>
            {children}
        </newsContext.Provider>
    )
}

export const useNewsContext=()=>useContext(newsContext);