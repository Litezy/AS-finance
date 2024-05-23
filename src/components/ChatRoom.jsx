import React, { useCallback, useEffect, useState } from 'react'
import Chatmessages from './Chatmessages'
import { useSearchParams } from 'react-router-dom'
import ChatForm from './ChatForm'
import { errorMessage, successMessage } from './utils/UtilNames'
import { useDispatch, useSelector } from 'react-redux'
import { Apis, ClientGetApi, GetApi, PostApi, profileImg, socket } from '../services/Apis'
import { dispatchMessages, dispatchRoomid } from '../app/reducer'
import { FaArrowLeft } from 'react-icons/fa'
import FormInput from './FormInput'
import Loading from '../components/Loading'
import { MoveToBottom } from './utils/functions'


const ChatRoom = ({fetchActive, setScreen, stat, setStat, id, setChats, chats, activechats, status }) => {


    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [probdata, setprobdata] = useState({})
    const [forms, setForms] = useState({
        issues: '',
        details: '',
        firstname: '',
        lastname: '',
        roomid: ''
    })

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const roomid = id
    const fetchUserMessages = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(`${Apis.Chats.msgs}/${roomid}`)
            // console.log(response)
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
    const [close, setClose] = useState(false)


    const back = () => {
        setScreen(2)
        fetchActive()

    }

    const fetchProbChats = async () => {
        setLoading(true)
        try {
            const response = await GetApi(`${Apis.Chats.fetch_probs}/${roomid}`)
            // console.log(response,roomid)
            if (response.status === 200) {
                setprobdata(response.data)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }



    const sendProbChat = async () => {
        setLoading(true)
        if(!forms.firstname) return errorMessage('first name is required')
        if(!forms.lastname) return errorMessage('lastname is required')
        if(!forms.issues) return errorMessage('problems faced is required')
        const formdata = {
            firstname: forms.firstname,
            lastname: forms.lastname,
            issues: forms.issues,
            details: forms.details,
            roomid: id
        }
        try {
            const response = await PostApi(Apis.Chats.send_prob, formdata)
            // console.log(response)
            if (response.status === 200) {
                successMessage(response.msg)
                setChats(false)
                fetchProbChats()
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

   const sendMessage = () =>{
    fetchUserMessages()
    socket.emit('sending-chat')
    MoveToBottom()
   }
    

    useEffect(() => {
        fetchProbChats()
        fetchUserMessages()
    }, [])

useEffect(()=>{
  socket.on('send-back-chat',()=>{
    fetchUserMessages()
    MoveToBottom()
    console.log('send-back-chat')
  })
},[socket])

    return (
        <div className=' h-[83dvh]   fixed mr-3 md:w-2/3 w-11/12'>
            <div className="flex w-full items-center justify-between">
            </div>
            <div className="border mt-4 shadow-lg h-[83dvh] rounded-md w-full  ">

                <div className=" text-white flex flex-col h-full  w-full ">
                    {loading && <Loading />}
                    <div className="overflow-auto  mb-4 py-20  relative text-black w-full pt-1 px-2 chatscroll divs h-[30dvh]  flex-1 ">
                        {chats && <>
                            <div className=" absolute top-[0.5]  backdrop-blur-md overflow-x-hidden h-fit py-4 w-full">
                                <div className="flex mt-3 gap-5 items-center justify-center w-11/12  md:w-3/4 mx-auto ">
                                    <div className="items-center justify-between w-full ">
                                        <div className="w-full h-full">
                                            <div className="font-bold text-sm text-center">Kindly fill out this information</div>
                                            <form className='w-full'>
                                                <div className="mt-3 flex-col md:flex-row flex gap-3">
                                                    <div className="w-1/2">
                                                        <h3 className='text-sm'>First Name:</h3>
                                                        <FormInput placeholder={'first name'} name={'firstname'} value={forms.firstname} onchange={handleChange} />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <h3 className='text-sm'>Last Name:</h3>
                                                        <FormInput placeholder={'last name'} name={'lastname'} onchange={handleChange} value={forms.lastname} />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h3 className='text-sm'>Issue Faced:</h3>
                                                    <textarea onChange={handleChange} name='issues' value={forms.issues} placeholder="what are the problems you're facing" className='scroll outline-none pt-3 text-sm text-black border w-full min-h-32 pl-2 '></textarea>
                                                </div>
                                                <div className="mt-3">
                                                    <h3 className='text-sm'>Additional Details:</h3>
                                                    <FormInput name={'details'} value={forms.details} onchange={handleChange} placeholder={'Optional'} />
                                                </div>

                                            </form>
                                        </div>
                                        <div className="w-full  mt-4 flex items-center justify-center  h-full">
                                            <button onClick={sendProbChat} className='px-4 py-1 mainbg rounded-md text-white'>send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}


                        {close && <>
                            <div className="flex items-center  flex-col justify-center absolute text-white top-1/3 abs w-3/4 bg-black/50 z-50 rounded-md h-40 backdrop-blur-sm gap-8">
                                <div className="">Are you sure you want to delete the chats?</div>
                                <div className="flex md:w-2/4 mx-auto items-center justify-between w-11/12">
                                    <button onClick={() => setClose(!close)} className='md:px-4 px-3 bg-red-500 py-2 rounded-md'>cancel</button>
                                    <button onClick={deleteAndCloseChat} className='px-4 bg-green-500 py-2 rounded-md'>proceed</button>
                                </div>
                            </div>
                        </>}
                        <div className="h-fit md:w-[66.9%] w-[91%] top-[14.5%] rounded-md  z-50 fixed transform -translate-x-1/2 -right-[41%] md:-right-10 md:left-[61.5%] left- bg-gray-800 backdrop-blur-2xl ">
                            <div className="flex h-full w-full items-center justify-between px-5">
                                <FaArrowLeft onClick={back} className='text-xm text-white  cursor-pointer ' />
                                <div className="flex items-center gap-5">
                                    <div className=" border-white border rounded-full w-10 bg-white h-10 ">
                                        <img src={`${profileImg}/profiles/${activechats?.image}`}
                                            className='w-8 h-8 mx-auto rounded-full object-cover' alt="" />
                                    </div>
                                    <div className="flex items-center gap-1 flex-col">
                                        <h1 className='text-white capitalize text-sm'>Admin {activechats?.username}</h1>
                                        <h1 className='text-white text-sm'>typing...</h1>
                                    </div>
                                </div>
                                <p className={`${status === 'offline' ? 'text-gray-500' : 'text-green-500'}`}>offline</p>
                            </div>
                        </div>
                        {!chats && <div className=" w-fit text-sm max-w-2/4  text-white rounded-md px-2  mainbg outgoing relative  ml-auto border mt-12 mr-2 ">
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

                        </div>}
                        <p className='mt-3 text-sm  text-center'>please wait for an admin to join your chat</p>
                        <Chatmessages
                            messages={data}

                        />
                    </div>
                    <div className="pb-2">
                        <ChatForm roomid={id}
                        sendmessage={sendMessage}

                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatRoom