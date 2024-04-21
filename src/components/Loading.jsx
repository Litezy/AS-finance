import React, { useEffect } from 'react'

const Loading = ({Trigger}) => {
  // useEffect(()=>{
  //   Trigger(prev =>!prev)
  // },[])
  return (
    <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/40'>
    <div className="loader">
    </div>
  </div>
  )
}

export default Loading