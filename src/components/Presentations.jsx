import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import imgOne from '../assets/motorbike.jpg'
import imgtwo from '../assets/delivery.png'


const Presentations = () => {

    const [show, setShow] = useState(false)

    const showMore = () => {
      setShow(prev => !prev)
    }
    return (
        <div className='w-1/4'>
            <div className={`w-full bg-white  py-2 px-2 rounded-xl ${show && 'h-[26rem] '}h-[18rem]`}>
                <div className="w-11/12 mx-auto ">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className='font-bold text-lg'>Present Presentations</h1>
                        <div className="text-white bg-[#f9751a] px-1 py-1 rounded-md"><FaPlus  className='cursor-pointer'/></div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgOne} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 1</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>929 X 1060</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgtwo} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 2</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>9229 X 1060</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgOne} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 3</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>989 X 2090</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgtwo} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 4</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>929 X 1090</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className={`${show === true ?'flex flex-col':'hidden '}`} >
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgtwo} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 5</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>929 X 1090</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgtwo} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 6</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>929 X 1090</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mb-2">
                        <div className="flex items-center gap-2">
                            <img src={imgtwo} alt="" className='w-8' />
                            <div className="flex items-start flex-col">
                                <h1 className='font-medium'>Presentaton 7</h1>
                                <p className='font-medium text-[10px] text-[#55585e]'>929 X 1090</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    </div>
                    <div className="w-fit ml-auto "><button onClick={showMore} className='underline'>{show ? 'view less':'view all'}</button></div>
                </div>

            </div>
            <div className="mt-10 w-full bg-white  px-2 rounded-xl py-5 ">
                <div className="w-11/12 mx-auto h-full">
                    <h1 className='font-bold text-lg'>License Information:</h1>
                    <div className="flex items-center justify-center w-full  h-full px-1 gap-4 mt-2">
                        <div class="relative flex items-baseline  gap-2">
                            <div class="bar1  w-2 h-5 bg-[#2470ec]"></div>
                            <div class="bar2 w-2 h-8 bg-[#ffce19]"></div>
                            <div class="bar3 w-2 h-10 bg-[#059c1a]"></div>
                        </div>
                        <div className="">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#059c1a]"></div>
                                    <div className="text-[11px] self-start">Media devices</div>
                                </div>
                                <div className="text-[11px] ">71</div>
                            </div>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#ffce19]"></div>
                                    <div className="text-[11px]">Unused Licenses</div>
                                </div>
                                <div className="text-[11px]">27</div>
                            </div>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#2470ec]"></div>
                                    <div className="text-[11px]">Licenses Acquired</div>
                                </div>
                                <div className="text-[11px]">23</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentations