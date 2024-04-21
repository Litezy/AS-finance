import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { GiUncertainty } from "react-icons/gi";
import { RiPlayListFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg"
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import imgdog from '../assets/dog.jpg'
const SideNav = ({ closeView,...props }) => {
  const toggle = useRef()
const navigate = useNavigate()

  useEffect(() => {
    if (toggle) {
      window.addEventListener("click", (event) => {
        if (toggle.current !== null) {
          if (toggle.current.contains(event.target)) {
            console.log(`not null`)
          } else {
            closeView()
          }
        }
      }, true)
    }

  }, [])


  return (
    <div id='nav' ref={toggle} className='w-[60%] rounded-md fixed top-0 right-0 bg-white  h-[100vh]  ' >
      <div className="flex items-center  flex-col gap-20 text-xl">
        <div className="flex items-center flex-col text-[#f9751a] font-bold gap-2 pt-3 mt-14 w-10/12 mx-auto ">
          <div className="">
            <AiOutlineClose onClick={() => closeView()} className='text-4xl cursor-pointer absolute top-5 right-5 text-[#5aaa9f]' />
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <FaHome className='' />
            <Link to="/" className="">Home</Link>
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <RiPlayListFill />
            <Link to="/services" className="">Playlist</Link>
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <GiUncertainty />

            <Link to="/about" className="">About us</Link>
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <CgLogIn />
            <Link to="/login" className="">Login</Link>
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <FaRegUser />
            <Link to="/signup" className="">Sign up</Link>
          </div>
        </div>

        <div className="cursor-pointer">
          <img onClick={() => navigate('/signup')} src={imgdog} className='w-32 rounded-full' alt="" />
        </div>

        <div className="text-[#f9751a] font-bold flex items-center flex-col w-10/12">
          <div className="flex  w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <BsFillTelephoneOutboundFill />
            <Link to="/contact" className="">Contact us</Link>
          </div>
          <div className="flex w-2/3 mx-auto justify-even gap-5 hover:underline items-center">
            <MdOutlineEmail />
            <Link to="/contact" className="">Email us</Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SideNav