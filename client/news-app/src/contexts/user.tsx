import { createContext,useContext,useState } from "react";

type UserContextType={user:{name:string,email:string} | null,setUser:(user:{name:string,email:string} | null)=>void}

type UserContextProviderProps={
    children:React.ReactNode
}

const userContext=createContext<UserContextType>({} as UserContextType);

export const UserContextProvider=({children}:UserContextProviderProps)=>{
    const [user,setUser]=useState<{name:string,email:string} | null>(null);
    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext=()=>useContext(userContext);