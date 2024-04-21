import React from 'react'

const Loader = ({width,height}) => {
  return (
    <div className={` w-${width} h-${height}  flex items-center justify-center bg-transparent`}>
    <div className="loader1">
    </div>
  </div>
  )
}

export default Loader