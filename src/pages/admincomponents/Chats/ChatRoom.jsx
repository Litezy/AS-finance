import React from 'react'

const ChatRoom = ({ selected, setScreen }) => {
    return (
        <div className="md:w-3/4 w-11/12 mt-5 mx-auto">
            <button onClick={() => setScreen(1)} className='px-4 py-1 mainbg text-white rounded-md mb-5'>back</button>
            <div className='  mx-auto h-96 border shadow-xl rounded-md overflow-y-auto relative'>
                <div className="w-full h-fit py-3 sticky px-4 shadow-md">
                    <div className="w-11/12 mx-auto h-full flex items-start justify-between  pl-3">
                       <div className="flex items-start gap-3">
                       <img src={selected[0].image} className='h-10 object-cover w-10 rounded-full' alt="" />
                        <div className="">
                            <h3>{selected[0].username}</h3>
                            <p className={`${selected[0].status === 'online' ? 'text-green-500' : 'textgray-500'}`}>{selected[0].status}</p>
                        </div>
                       </div>
                        <div className="">
                            <p>last seen</p>
                            <p className='text-sm'>yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom