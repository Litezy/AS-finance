import React, { useCallback, useEffect, useState } from 'react'
import { errorMessage } from './utils/UtilNames'
import { Apis, GetApi } from '../services/Apis'
import { useSelector } from 'react-redux'

const Chatmessages = ({ }) => {

  const profile = useSelector((state) => state.data.profile)
  const messages = useSelector((state) => state.data.messages)
  

  return (
    <div className='w-full h-fit '>
      {messages.map((item, i) => {
        const isFirstFromSender = i === 0 || messages[i - 1].sender !== item.sender;
        // console.log(messages[i-1].sender)
        return (
          <>
            {item.sender !== profile.id ?
            <div key={i}
              className={`${item.content.length <= 90 ?'w-fit':'w-[55%]'} text-sm relative 
              ${isFirstFromSender ? 'incoming':'rounded-e-none'} 
               px-2 mt-2 mr-auto  bg-slate-300 py-2  rounded-md ml-2`}>
              {item.content}</div >
            : <div key={i}
              className={`${item.content.length <= 90 ?'w-fit':'w-[55%]'} relative text-sm  border px-2 
              ${isFirstFromSender ? 'outgoing':'rounded-e-sm'}
              mt-2 ml-auto mainbg text-white  py-2  rounded-md mr-2`}>{item.content}</div>}
          </>
        )
      })}

    </div >
  )
}


export default Chatmessages

