import React, { useEffect, useRef, useState } from 'react'
import ChatForm from './ChatForm'
import { FaArrowLeft } from 'react-icons/fa'
import { Apis, GetApi, PostApi, profileImg } from '../services/Apis'
import { errorMessage, successMessage } from './utils/UtilNames'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'

const InactiveMessages = ({ chatsArr, setScreen }) => {

  const profile = useSelector((state) => state.data.profile)
  const [messages, setMessages] = useState([])
  const [probdata, setprobdata] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const refdiv = useRef(null)
  const [deletechat, setDeletechat] = useState(false)
  const fetchOldMsgs = async () => {
    const roomid = chatsArr[0].id
    try {
      const response = await GetApi(`${Apis.Chats.msgs}/${roomid}`)
      if (response.status === 200) {
        setMessages(response.data.messages)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }

  const fetchProbChats = async () => {
    setLoading(true)
    const roomid = chatsArr[0].id
    try {
      const response = await GetApi(`${Apis.Chats.fetch_probs}/${roomid}`)
      console.log(response)
      if (response.status === 200) {
        setprobdata(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOldMsgs()
    fetchProbChats()
  }, [])
  const back = () => {
    setScreen(2)
  }

  const deleteChat = async () => {
    const id = chatsArr[0].id
    const formdata = {
      id: id
    }
    try {
      const response = await PostApi(Apis.Chats.delete, formdata)
      if (response.status === 200) {
        successMessage(response.msg)
        setScreen(2)
      } else {
        errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }

  useEffect(() => {
    if (refdiv) {
      window.addEventListener('click', (e) => {
        if (refdiv.current !== null) {
          if (refdiv.current.contains(e.target)) {

          } else {
            setDeletechat(false)
          }
        }
      }, true)
    }
  }, [])

  return (
    <div className='md:w-[70%] w-11/12 mt-3 md:left-[27%] fixed h-[80dvh] border'>
      {loading && <Loading />}
      <div className="w-full h-[10dvh] ">
        <div className="flex items-center justify-between h-full shadow-sm px-3">
          <FaArrowLeft onClick={back} className='text-sm  cursor-pointer ' />
          <div className="flex items-center gap-5">
            <img src={`${profileImg}/profiles/${chatsArr[0]?.friend?.image}`} className='w-8 h-8 rounded-full' alt="" />
            <div className="flex">
              <h3 className=' capitalize'>{chatsArr[0]?.friend?.username}</h3>
            </div>
          </div>
          <button onClick={() => setDeletechat(true)} className='px-4 py-1.5 bg-red-500 rounded-md text-white'>delete chats</button>
        </div>
        {deletechat && <>
          <div ref={refdiv} className="flex items-center  flex-col justify-center absolute text-white top-1/3 abs w-3/4 md:w-2/4 bg-black/70 z-50 rounded-md h-40 backdrop-blur-sm gap-8">
            <div className="">Are you sure you want to delete the chats?</div>
            <div className="flex md:w-2/4 mx-auto items-center justify-between w-11/12">
              <button onClick={() => setDeletechat(false)} className='md:px-4 px-3 bg-red-500 py-2 rounded-md'>cancel</button>
              <button onClick={deleteChat} className='px-4 bg-green-500 py-2 rounded-md'>proceed</button>
            </div>
          </div>
        </>}
      </div>
      <div className="w-full h-[70dvh] overflow-y-auto py-2">
        <div className=" w-fit text-sm max-w-2/4  text-white rounded-md px-2  mainbg outgoing relative
          ml-auto border mr-2 ">
          <h1 className='text-right'>Your Details</h1>
          <div className="flex items-center justify-end  text-right gap-1">
            <h2>Name:</h2>
            <h2>{probdata.firstname} {probdata.lastname}</h2>
          </div>
          <div className="flex items-center justify-end  text-right gap-1">
            <h2>Problems:</h2>
            <h2>{probdata.issues}</h2>
          </div>
          <div className="flex items-center justify-end  text-right gap-1">
            <h2>Additional Details:</h2>
            <h2>{probdata.details === '' ? 'empty' : probdata.details}</h2>
          </div>

        </div>
        {messages.map((item, i) => {
          const isFirstFromSender = i === 0 || messages[i - 1].sender !== item.sender;
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
      </div>
      {/* <ChatForm /> */}
    </div>
  )
}

export default InactiveMessages