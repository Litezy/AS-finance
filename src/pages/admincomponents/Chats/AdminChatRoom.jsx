import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import AdminChatMessages from './AdminChatMessages';
import AdminChatForm from './AdminChatForm';
import Loading from '../../../components/Loading';
import { Apis, GetApi, socket,profileImg } from '../../../services/Apis';
import { MoveToBottom } from '../../../components/utils/functions';
import { errorMessage } from '../../../components/utils/UtilNames';
import { useDispatch } from 'react-redux';
import { dispatchMessages } from '../../../app/reducer';
import { FaArrowLeftLong } from "react-icons/fa6";

const AdminChatRoom = ({ probchat, selectedUser, setScreen, msgs }) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

 const lastSeen = selectedUser[0]?.lastseen
//  const newTime = lastSeen.slice(11)




    const dateString = lastSeen
    const date = moment(dateString);
    const now = moment()
    const hoursDifference = now.diff(date, 'hours');
    let formattedDate;

    if (hoursDifference < 24) {
        formattedDate = `today, ${date.format('hh:mm A')}`;
    } else if (hoursDifference > 24 && hoursDifference < 48) {
        formattedDate = date.fromNow();
    } else {
        formattedDate = `${Math.floor(hoursDifference / 24)} days ago`;
    }

    const fetchUserMessages = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(`${Apis.Chats.msgs}/${probchat.room}`)
            console.log(response)
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


    const sendMessage = () => {
        fetchUserMessages()
        socket.emit('sending-chat')
        MoveToBottom()
    }


    useEffect(() => {
        fetchUserMessages()
    }, [])

    useEffect(() => {
        socket.on('send-back-chat', () => {
            fetchUserMessages()
            MoveToBottom()
            console.log('send-back-chat')
        })
    }, [socket])
    return (
        <div className=" mx-auto mt-2  lg:-mt-14">
            {loading && <Loading />}
            <div className='  h-[90dvh] overflow-hidden lg:h-[100dvh]  border shadow-xl rounded-md  relative '>

                <div className="w-full h-[13dvh]  sticky px-5 border-b">
                    <div className="h-full flex items-center justify-between ">

                        <div className="flex items-center gap-6 ">
                            <div onClick={()=> setScreen(1)} className={`flex items-center ${!selectedUser[0]?.image && 'bg-[#cbd5e1] px-2 py-1.5 rounded-md'} gap-1 cursor-pointer `}>
                                < FaArrowLeftLong className='text-3xl' />
                                {selectedUser[0]?.image ? <img src={`${profileImg}/profiles/${selectedUser[0]?.image}`} className='h-10 object-cover w-10 rounded-full' alt="" /> : <FaRegUser className='text-3xl' />}
                            </div>

                            <div className="">
                                <h3 className='font-bold text-lg capitalize'>{selectedUser[0]?.username}</h3>
                                <p className={`${selectedUser[0]?.status === 'online' ? 'text-green-500 bg-green-100' : 'textgray-500 bg-zinc-200'} px-2 py-.5 rounded-full text-xs`}>{selectedUser[0]?.status}</p>
                            </div>
                        </div>
                        <div className="">
                            {selectedUser[0].status === 'offline' ?
                                <>
                                    <p>last seen</p>
                                    <p className='text-sm'> {formattedDate} </p>
                                </> : ''
                            }
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-between flex-col w-full  relative">
                    <div className="lg:h-[72dvh] h-[64.5dvh] w-full pt-2  mb-2 overflow-auto scrolladmin divs">
                        <AdminChatMessages setScreen={setScreen} msgs={msgs} probchat={probchat} />
                    </div>
                    <div className="lg:h-[12dvh] h-[10dvh] w-full ">
                        <AdminChatForm sendmessage={sendMessage} roomid={probchat} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminChatRoom