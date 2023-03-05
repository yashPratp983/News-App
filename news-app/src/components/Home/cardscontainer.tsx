import Cardcom from "./card"
import classes from './cardcontainer.module.css'
import { useNewsContext } from "../../contexts/news"

type Props = {
    searchNews: string
}

const CardContainer = ({searchNews}:Props) => {
    const {news,setNews}=useNewsContext()
    return (
        <div  >
            <Cardcom searchNews={searchNews}/>
        </div>
    )
}

export default CardContainer