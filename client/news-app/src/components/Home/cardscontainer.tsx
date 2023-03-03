import Cardcom from "./card"
import classes from './cardcontainer.module.css'
import { useNewsContext } from "../../contexts/news"
const CardContainer = () => {
    const {news,setNews}=useNewsContext()
    return (
        <div  >
            <Cardcom />
        </div>
    )
}

export default CardContainer