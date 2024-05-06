import React, { useState } from 'react'


const Chats = ({chat,selectedItem,setScreen,select}) => {
     
    return (
        <div className='w-full mt-5'>
                <div className="w-11/12 mx-auto" >
                    <div className="flex items-center justify-between border-b">
                        <div className="flex items-start gap-3 mt-10 ">
                            <img src={chat.image} className='w-10 h-10 rounded-full object-cover' alt="" />
                            <div className="">
                                <h2>{chat.username}</h2>
                                <p className={` ${chat.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>{chat.status}</p>
                            </div>
                        </div>
                        <button onMouseOver={()=>selectedItem(chat.id)} onClick={() => {setScreen(2),console.log(select)}} className=' mr-1 px-4 py-1 mainbg text-white rounded-md'>open</button>
                    </div>
                </div>
        </div>
    )
}

export default Chats