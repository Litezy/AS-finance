import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdImages } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TiCloudStorage } from "react-icons/ti";
import { RiBaseStationLine } from "react-icons/ri";
import { RiWifiOffLine } from "react-icons/ri";
import { SlCursor } from "react-icons/sl";
const Profile = () => {


    const [show, setShow] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [selectDate, setSelectdate] = useState(null)
    const handleDateChange = (date) => {
        setSelectdate(date);
    };

    const showDate = () => {
        setShow(!show)
    }
    return (
        <div className='bg-white rounded-md h-[25vh] w-full  px-2 flex flex-col items-center justify-center'>
            <div className="flex w-full items-center justify-between">
                <h1 className='font-bold text-2xl'>Hello, USER</h1>
                <div className="flex items-center justify-end w-1/2 gap-3">Today
                    <DatePicker
                        selected={selectDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        showPopperArrow={false} // Hide the arrow in the DatePicker popper
                        popperPlacement="bottom-end" // Position the DatePicker popper
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className={`rounded-md px-4 ${show ? 'block' : 'hidden'}`} // Show or hide based on show state
                    />
                    <FaCalendarAlt onClick={showDate} className='text-xl text-gray-400 cursor-pointer' />
                </div>
            </div>
            <div className="flex items-center mt-2 gap-4 w-full">
                <div className="w-[20%] h-20 bg-[#111827] text-white rounded-md   pt-3">
                    <div className="flex items-center gap-5 w-full mx-auto justify-center relative">
                        <div className="font-bold">
                            <p className='text-sm capitalize'># of contents</p>
                            <h1 className='text-2xl'>508</h1>
                        </div>
                        <IoMdImages className='text-2xl'/>
                        <SlCursor className='absolute bottom-3 font-bold'/>
                    </div>
                </div>
                <div className="w-[20%] h-20 bg-white text-[#111827] rounded-md flex border ">
                    <div className="flex items-center gap-5 w-full mx-auto justify-center relative">
                        <div className="font-bold">
                            <p className='text-sm capitalize'>storage used</p>
                            <h1 className='text-2xl font-bold'>10 GB</h1>
                        </div>
                        <TiCloudStorage className='text-4xl'/>
                    </div>
                </div>
                <div className="w-[20%] h-20 bg-white border text-[#111827] rounded-md flex ">
                    <div className="flex items-center gap-5 w-full mx-auto justify-center relative">
                        <div className="font-bold">
                            <p className='text-sm capitalize'>online devices</p>
                            <h1 className='text-2xl'>24</h1>
                        </div>
                        <RiBaseStationLine className='text-2xl'/>
                        
                    </div>
                </div>
                <div className="w-[20%] h-20 bg-white border text-[#111827] rounded-md flex ">
                    <div className="flex items-center gap-5 w-full mx-auto justify-center relative">
                        <div className="font-bold">
                            <p className='text-sm capitalize'>Offline devices</p>
                            <h1 className='text-2xl'>36</h1>
                        </div>
                        <RiWifiOffLine className='text-2xl'/>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile