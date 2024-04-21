import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from '../assets/delivery.png'

const SearchBar = () => {
  const [show, setShow] = useState(false)
  const toggle = useRef()
  const Icon = show === true ? FaChevronDown : FaChevronUp
  const showProfile = () => {
    setShow(prev => !prev)
  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (toggle.current !== null) {
        if (toggle.current.contains(e.target)) {
        } else {
          setShow(false)
        }
      }
    }, true)
  }, [])


  return (
    <div className='w-full bg-white rounded-md shadow-lg relative'>
      <form >
        <div className="h-14 flex items-center w-full   px-3 py-2 justify-between relative">
          <input type="text" placeholder='search anything' className='w-[40%] outline-none h-10 pl-3 rounded-md bg-[#f8f8f8]' />
          <div className="flex items-center gap-3   w-1/4">
            <div className="flex items-center gap-2  cursor-pointer bg-black text-white px-3 p-3 rounded-sm">
              <button className='text-[12px] font-bold'>Add new</button>
              <FaChevronDown className='w-3' />
            </div>
            <div className="bg-[#f8f8f8] w-10 h-10 rounded-full flex items-center justify-center relative">
              <div className="absolute w-2 h-2 bg-orange-600 rounded-full right-[20%] top-1"></div>
              <IoMdNotificationsOutline className='text-xl cursor-pointer font-bold' />
            </div>
            <div className=" w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer">
              <img onClick={showProfile} src={profile} className='w-8 object-cover' alt="" />
            </div>
            <Icon onClick={showProfile} className='w-8 cursor-pointer' />
          </div>

        </div>
      </form>
      <div ref={toggle} className={`h-20 w-[20%] ${show ? 'absolute' : 'hidden'} rounded-md absolute bg-[#f9751a]  font-bold px-4 top-14 z-40 right-0 flex items-center justify-between`}>
        <button className="px-5 py-1 bg-white rounded-full ">profile</button>
        <button className="px-5 py-1 bg-white rounded-full">logout</button>
      </div>
    </div>
  )
}

export default SearchBar