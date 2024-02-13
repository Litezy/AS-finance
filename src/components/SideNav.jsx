import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const SideNav = ({ closeView }) => {
  const toggle = useRef()

  useEffect(() => {
    if (toggle) {
      window.addEventListener("click", (event) => {
        if (toggle.current !== null) {
          if(toggle.current.contains(event.target)){
            console.log(`not null`)
          }else{
            closeView()
          }
        }
      }, true)
    }

  }, [])

 
  return (
    <div id='nav' ref={toggle} className='w-[40%] fixed  right-0 bg-black/90 rounded-sm h-[100vh]  '>
      <div className="flex items-center  flex-col gap-[25rem] text-lg">
        <div className="flex items-center flex-col text-white gap-2 pt-3 ">
          <a className=' hover:underline' href="/">Home</a>
          <a className=' hover:underline' href="/services">Services</a>
          <a className=' hover:underline' href="">About us</a>
          <a className=' hover:underline' href="">Login</a>
          <a className=' hover:underline' href="">Sign up</a>
        </div>
        <div className="text-white w-full flex items-center flex-col">
          <a className='hover:underline' href="">contact us</a>
          <a className='hover:underline' href="">tel:</a>
        </div>
      
      </div>

    </div>
  )
}

export default SideNav