import './Loading.css'
import React from 'react'
type LoadingProps={
    loading:boolean
    children:React.ReactNode
}

function Loading({loading,children}:LoadingProps): (JSX.Element| React.ReactNode){
    if (loading) {
        return (
            <div className="spin">
            </div>
        )
    }
    return children
}

export default Loading