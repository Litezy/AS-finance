import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";

const AdminChatMessages = ({msgs,probchat,setScreen}) => {

  const profile = useSelector((state) => state.data.profile)
  const messages = useSelector((state) => state.data.messages)

  let lastName = probchat.lastname
  let lastChar =lastName.charAt(lastName.length -1)
  let lastUsername;
  if(lastChar === 's'){
    lastUsername =`${lastName}'`
  }else{
    lastUsername = `${lastName}'s`
  }
  return (
    <div className='w-full h-fit'>
      <div className="flex items-start rounded-md ml-2 relative incomingadmin w-fit max-w-[50%] flex-col px-2  bg-[#cbd5e1] mr-auto py-.5  ">
      <div className="capitalize ">{probchat.firstname} {lastUsername} Details</div>
      <div className="flex items-center gap-1">
        <div className="">Issues Faced:</div>
        <div className="">{probchat.issues}</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="">Additional Details:</div>
        <div className="">{probchat.details ? probchat.details:'nil'}</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="">Date Submitted:</div>
        <div className="">{moment(probchat.createdAt).format('DD-MM-YYYY hh:mm A')}</div>
      </div>
      </div>
      {messages.map((item, i) => {
        const isFirstFromSender = i === 0 || messages[i - 1].sender !== item.sender;
        // console.log(messages[i-1].sender)
        return (
          <>
            {item.sender !== profile.id ?
              <div key={i}
                className={`${item.content.length <= 90 ? 'w-fit' : 'w-[55%]'} text-sm relative 
                ${isFirstFromSender ? 'incoming' : 'rounded-e-none'} 
                 px-2 mt-2 mr-auto  bg-slate-300 py-2  rounded-md ml-2`}>
                {item.content}</div >
              : <div key={i}
                className={`${item.content.length <= 90 ? 'w-fit' : 'w-[55%]'} relative text-sm  border px-2 
                ${isFirstFromSender ? 'outgoing' : 'rounded-e-sm'}
                mt-2 ml-auto mainbg text-white  py-2  rounded-md mr-2`}>{item.content}</div>}
          </>
        )
      })}

    </div >
  )
}




export default AdminChatMessages