import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { HiMiniBars3BottomRight } from "react-icons/hi2"
import { AiOutlineClose } from "react-icons/ai";
import SideNav from './SideNav'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const HeaderNav = ({ ...props }) => {
    const [show, setShow] = useState(false)
    const Icon = show === true ? AiOutlineClose : HiMiniBars3BottomRight
    const navigate = useNavigate()
    const profile = useSelector(state => state.data.profile)
    console.log(Object.keys(profile))


    return (
        <div className='w-[100%] md:w-full fixed flex items-center z-50  justify-between py-2 mx-auto shadow-lg  top-0 right-0 -left-0 p  bg-[#430a5d]' >
            <div className="w-full">
                <div className="flex w-full items-center justify-between mt-2">
                    <div onClick={() => navigate(`/`)} className="flex items-center  w-1/2 justfy-center  pl-5 cursor-pointer">
                        <img src={logo} alt="logo-img" className='w-12 object-cover rounded-full mr-2 h-12 bg-white' />
                        <h2 className='font-bold text-xl text-white'><i>Blaize</i> <span className='text-[#E26EE5] text-xl '>Finance  </span></h2>
                    </div>
                    <div className="md:hidden mr-5">
                        <Icon onClick={() => setShow(prev => !prev)} className='text-4xl cursor-pointer text-white' />
                    </div>
                    <div className="md:flex items-center  gap-2 text-sm  w-1/2 justify-end pr-5  hidden py-0 ">
                       {Object.keys(profile) > 1 ? <Link to={`/`} className=' text-sm border-[white] text-[white]  hover:bg-[white] hover:text-[#E26EE5] hover:transition-all  px-3 py-1 border-r hover:ease-in-out hover:duration-500'>Home</Link>

                       : 
                       <>
                       <Link to={`/`} className=' text-sm border-[white] text-[white]  hover:bg-[white] hover:text-[#E26EE5] hover:transition-all border-r hover:ease-in-out hover:duration-500  px-3 py-1'>About us</Link>
                        <Link to={`/`} className=' text-sm border-[white] text-[white]  hover:bg-[white] hover:text-[#E26EE5] hover:transition-all border-r  px-3 py-1 transition-all hover:ease-in-out hover:duration-500'>Sign Up</Link>
                        <Link to={`/`} className='text-sm border-[white] text-[white]  hover:bg-[white] hover:text-[#E26EE5] hover:transition-all px-3 py-1 hover:ease-in-out hover:duration-500'>Login</Link>
                       </>}
                    </div>
                </div>
            </div>


            {show && <SideNav closeView={setShow} className="md:hidden" />}
        </div>

    )
}

export default HeaderNav