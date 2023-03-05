import Header from "./header"
import CardContainer from "./cardscontainer"
import axios from "axios"

import { useEffect,useState } from "react"
const Home = () => {
    const [searchedNews,setSearchedNews]=useState<string>('')

    const getSearchNews=(filteredNews:string)=>{
        setSearchedNews(filteredNews)
    }

    return (
        <div>
        <Header getSearchNews={getSearchNews}/>
        <CardContainer searchNews={searchedNews}/>
        </div>
    )
}

export default Home