import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
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
    <div id='nav' ref={toggle} className='w-[40%] fixed top-0 right-0 bg-black/90 rounded-sm h-[100vh]  '>
      <div className="flex items-center  flex-col gap-[20rem] text-lg">
        <div className="flex items-center flex-col text-white gap-2 pt-3 mt-14 ">
      <div className="">
        <AiOutlineClose onClick={() =>closeView()} className='text-4xl cursor-pointer absolute top-5 right-5' onClick={() => closeView()} />
      </div>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/about" className="hover:underline">About us</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign up</Link>
          
      
        </div>
        <div className="text-white w-full flex items-center flex-col">
        <Link to="/contact" className="hover:underline">Contact us</Link>
        <Link to="/contact" className="hover:underline">Email us</Link>
        </div>
      
      </div>

    </div>
  )
}

export default SideNav