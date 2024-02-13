import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { HiMiniBars3BottomRight } from "react-icons/hi2"
import { AiOutlineClose } from "react-icons/ai";
import SideNav from './SideNav'

const HeaderNav = () => {
    const [show, setShow] = useState(false)
    const Icon = show === true? AiOutlineClose : HiMiniBars3BottomRight

  
    return (
        <div className='w-[100%] md:w-full bg-[#edfd93]  h-20 mx-auto fixed top-0 right-0 -left-0 px-0'>
            <div className="flex items-center justify-between">
                <div className="flex items-center  w-1/2  h-fit">
                    <img src={logo} alt="logo-img" className='w-20 object-cover' />
                    <h2 className='font-bold text-2xl'>AS <span className='text-white'>finace</span></h2>
                </div>
                <div className="md:hidden mr-5">
                    <Icon onClick={() => setShow(prev => !prev)} className='text-4xl cursor-pointer' />
                </div>
                <div className="md:flex items-center justify-end gap-2 text-lg font-medium w-1/2  hidden">
                    <button className='px-2 bg-[#edfd93]'>sign up</button>
                    <button className='px-2  bg-[#cbe1d6] rounded-md'>login</button>
                </div>
                
            </div>
            {show  && <SideNav closeView={setShow}/>}
        </div>
    )
}

export default HeaderNav