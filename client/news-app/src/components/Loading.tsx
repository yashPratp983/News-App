import './Loading.css'
import React from 'react'
type LoadingProps={
    loading:boolean
    children:React.ReactNode
}

function Loading(){

        return (
            <div className="spin">
            </div>
        )
  

}

export default Loading