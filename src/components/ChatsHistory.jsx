import React, { useCallback, useEffect, useRef, useState } from 'react'
import { errorMessage, successMessage } from './utils/UtilNames'
import { Apis, GetApi, PostApi, profileImg } from '../services/Apis'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { dispatchMessages, dispatchRoomid } from '../app/reducer'
import moment from 'moment'
import Loading from './Loading'
import { MoveToBottom } from './utils/functions'




const ChatsHistory = ({ fetchActive, fetchInactive, inactivechats, setLive, setScreen, status, setStat, setChats, activechats, setChatsArr, setActiveId, roomid, load2 }) => {

    const [loading, setLoading] = useState(false)

    const [inactivatemsgs, setInactiveMsgs] = useState([])
    const [openinactivemsgs, setOpenInactiveMsgs] = useState(false)
    const [close, setClose] = useState(false)
    const chatdiv = useRef(null)

    const [unread, setUnread] = useState([])


    // const adminprofile = useSelector((state) => state.data.profile)
    // // console.log(adminprofile)
    const dispatch = useDispatch()
    const messages = useSelector((state) => state.data.messages)
    const lastMessage = messages[messages.length - 1];
    const profileid = useSelector((state) => state.data.adminprofile)

    const startChat = async () => {
        const formdata = {
            receiver: profileid
        }
        // return console.log(formdata)
        setLoad(true)
        try {
            const response = await PostApi(Apis.Chats.create, formdata)
            if (response.status === 200) {
                if (response.stat === 'new') {
                    successMessage(response.msg)
                    setScreen(3)
                    setActiveId(response.id)
                    dispatch(dispatchRoomid(response.id))
                    setChats(true)
                }
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad(false)
        }
    }

    const fetchUserMessages = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(`${Apis.Chats.msgs}/${roomid}`)
            if (response.status === 200) {
                const messages = response.data.messages
                dispatch(dispatchMessages(messages))
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])


    const [load, setLoad] = useState(false)


    const fetchInactiveChatMessages = async () => {
        try {
            const response = await GetApi(Apis.Chats.inactive_chatmsgs)
            // console.log(response)
            if (response.status === 200) {
                setInactiveMsgs(response.data)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }





    const fetchUnreadmessages = async () => {
        try {
            const response = await GetApi(`${Apis.Chats.unread_msgs}/${roomid}`)
            if (response.status === 200) {
                setUnread(response.data)
            }
        } catch (error) {
            errorMessage(`Error: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchInactive()
        fetchUserMessages()
        fetchUnreadmessages()
        fetchInactiveChatMessages()
        // console.log(inactivechats)
    }, [])

    // const roomid = useSelector((state) => state.data.roomid)
    // console.log(roomid)

    const OpenChats = async () => {
        setLoading(true)
        const formdata = {
            receiver: profileid
        }
        try {
            const response = await PostApi(Apis.Chats.create, formdata)
            // console.log(response)
            if (response.status === 200) {
                if (response.stat === 'exists') {
                    const id = response.id
                    dispatch(dispatchRoomid(id))
                    // successMessage(response.msg)
                    setScreen(3)
                    setChats(false)
                    setActiveId(response.id)
                    setStat(response.stat)
                    MoveToBottom()
                }
            } else {
                errorMessage(response.msg)
            }
            const msgform = {
                roomid: roomid
            }
            const readmsgs = await PostApi(Apis.Chats.read_msgs, msgform)
            if (readmsgs.status !== 200) {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (chatdiv) {
            window.addEventListener('click', (e) => {
                if (chatdiv.current !== null) {
                    if (chatdiv.current.contains(e.target)) {

                    } else {
                        setClose(false)
                    }
                }
            }, true)
        }
    }, [])

    const Closechats = async () => {
        setLoading(true)
        const formdata = {
            roomid: roomid
        }
        try {
            const response = await PostApi(Apis.Chats.inactivate_chats, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                fetchInactive()
                fetchActive()
            } else {
                errorMessage(response.msg)
            }

        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const ViewOldmgs = (id) => {
        setInactiveMsgs(true)
        setScreen(4)
        setChatsArr(prev => {
            const select = inactivechats.filter((item) => item.id === id)
            prev = select
            // console.log(prev)
            return prev
        })

    }

    const back = () => {
        setScreen(1)
        setLive(false)
        fetchInactive()
        fetchInactiveChatMessages()
    }
    const message = useSelector((state) => state.data.messages)
    const profile = useSelector((state) => state.data.profile)
    const lastmessage = message[message.length - 1]?.sender
    // console.log(lastmessage)


    return (
        <div className='w-full h-full  '>
            <div className="h-[100dvh] w-full flex items-center gap-5 flex-col ">
                <button onClick={back} className="w-fit mr-auto px-4 py-1.5 mainbg text-white rounded-md">back</button>

                {loading && <Loading />}
                <div className="h-fit  w-full border overflow-y-auto py-2 rounded-md mainbg">

                    {activechats ? <>
                        {load &&
                            <>
                                <div className='h-full flex items-center text-white  justify-center'>Loading<span className="loading-dots">...</span></div>
                            </>
                        }

                        <h1 className='text-center font-semibold text-white '>Active Chat Session</h1>
                        <div onClick={OpenChats} className="mt-3 cursor-pointer w-11/12 mx-auto flex items-center justify-between bg-white py-2 px-5 rounded-full">
                            <div className="w-3/4 flex gap-6">
                                <div className="flex items-center gap-4">
                                    <img src={`${profileImg}/profiles/${activechats?.image}`} className=' border-white rounded-full object-cover w-10 h-10' alt="" />

                                </div>
                                <div className="flex flex-col">
                                    <h3 className='capitalize main font-semibold'> Admin {activechats?.username}</h3>
                                    <div className="">
                                        <span className='text-gray-700 pr-1'>{lastmessage === profile.id ? 'me:' : 'admin:'}</span>  
                                        <span>{lastMessage?.content.slice(0, 50)}{lastMessage?.content.length > 49 ? '...' : ''}</span> </div>
                                </div>
                            </div>
                            {unread.length > 0 && <div className="h-5 w-5 text-sm rounded-full bg-red-500 text-white flex items-center justify-center">
                                {unread.length}
                            </div>}
                            <div className="w-fit ml-auto flex flex-col">
                                <div className={`${status === 'offline' ? 'text-gray-400' : 'text-green-400'}`}>{status === 'offline' ? 'offline' : 'online'}</div>
                                <span className='text-[11px]'>{moment(lastMessage?.createdAt).format('hh:mm A')}</span>

                            </div>

                        </div>
                        <div className="w-fit ml-auto mr-10 mt-3">
                            <button onClick={() => setClose(true)} className='text-white px-4 py-1.5 bg-red-500 rounded-md'>close chat</button>
                        </div>
                        {close && <>
                            <div ref={chatdiv} className="absolute bg-white rounded-md h-32 md:w-2/4 w-3/4 mx-auto top-1/4 abs">
                                <div className="h-full flex flex-col items-center justify-center gap-5">
                                    <h1 className=''>Are you sure you want to close this chat?</h1>
                                    <div className="flex items-center justify-between  w-11/12 mx-auto">
                                        <button onClick={() => setClose(false)} className='px-4 py-1.5 bg-red-500 text-white rounded-md'>cancel</button>
                                        <button onClick={Closechats} className='px-4 py-1.5 bg-green-500 text-white rounded-md'>proceed</button>
                                    </div>
                                </div>
                            </div>
                        </>}




                    </> :
                        <div className="flex w-11/12 h-full mx-auto flex-col gap-3  items-center justify-center">
                            <div className="text-white">No active session</div>
                            <button onClick={startChat} className='px-3 py-1.5 bg-white rounded-md text-sm'>start a chat</button>
                        </div>
                    }
                </div>
                <div className="h-fit mx-h-[50dvh] w-full border py-2 mainbg rounded-md overflow-y-auto">
                    <h1 className='text-center text-white font-semibold '>Inactive Chat Sessions</h1>
                    {inactivechats ? <>
                        {inactivechats.map((item, i) => {
                            return (
                                <div key={i} className="mt-3 cursor-pointer w-11/12 mx-auto flex items-center justify-between bg-gray-500 py-2 px-5 rounded-full">
                                    {load2 &&
                                        <>
                                            <div className='h-full flex items-center  justify-center'>Loading<span className="loading-dots">...</span></div>
                                        </>}
                                    <div className="w-3/4 flex gap-6 items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={`${profileImg}/profiles/${item?.friend?.image}`} className=' border-white rounded-full object-cover w-10 h-10' alt="" />
                                            <div className="">
                                                <h3 className='capitalize text-white font-semibold'> Admin {item?.friend?.username}</h3>
                                            </div>
                                        </div>

                                        <div className="">
                                            <h3 className='text-white text-xs'>closed at {moment(item?.updatedAt).format('hh:mm A DD-MM-YYYY ')}</h3>
                                        </div>
                                    </div>
                                    <div className="w-fit ml-auto flex text-white">
                                        <button onClick={() => ViewOldmgs(item.id)} className='px-4 py-1.5 text-white bg-gray-800 rounded-md'>view</button>
                                    </div>
                                </div>

                            )
                        })}
                    </> :
                        <>
                            <div className="flex items-center justify-center text-white">No closed chats here</div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatsHistory