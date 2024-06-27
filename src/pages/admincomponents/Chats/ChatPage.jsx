import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";

import AdminChatRoom from './AdminChatRoom'
import { Apis, GetApi, profileImg } from '../../../services/Apis'
import { errorMessage } from '../../../components/utils/UtilNames'

const ChatPage = () => {
    const [select, setSelect] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    const [screen, setScreen] = useState(1)
    const [allactive, setAllActive] = useState([])
    const [msgs, setMsgs] = useState([])
    const [users, setUsers] = useState([])
    const [probchat, setProbchat] = useState({})

    const fetchAllActiveChats = async () => {
        try {
            const response = await GetApi(Apis.admins.fetch_active_chats)
            if (response.status === 200) {
                setAllActive(response.data)
                setUsers(response.findSenders)
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            console.log(error)
            throw new Error('error in fetching active chats')
        }
    }

  

    useEffect(() => {
        fetchAllActiveChats()
    }, [])


    const selectItem = async (id) => {
        setSelect(select => {
            const selected = allactive.filter((item) => item.id === id)
            select = selected
            return select
        })
        try {
            const response = await GetApi(`${Apis.admins.fetch_rooms}/${id}`)
            if (response.status === 200) {
                const allMessages = response.data.messages;
                setMsgs(allMessages);
            }
        } catch (error) {
            console.log(error)
            throw new Error('error in fetching room messages')
        }
        try {
            const response = await GetApi(`${Apis.admins.fetch_Probchat}/${id}`)
            if (response.status === 200) {
                const probdetails = response.data
                setProbchat(probdetails);
            }
        } catch (error) {
            console.log(error)
            throw new Error('error in fetching room messages')
        }

    }

    const selectUserid = (userid) => {
        setSelectedUser(selectedUser => {
            const selectuser = users.filter((item) => item.id === userid)
            selectedUser = selectuser
            return selectedUser
        })
    }




    return (
        <div className='mt-5 px-1 '>
            {msgs.map((msg, i) => {

                const lastMessage = msg
                return (
                    <div className="" key={i}></div>
                )
            })}
            {screen === 1 && <>
                <div className="text-center font-bold main mb-5">Chats with users</div>
                <div onClick={() => setScreen(2)} className="w-full px-3 border-b rounded-md py-6">
                    {allactive.length > 0 ?
                        <div className="">
                            {allactive.map((item, i) => {
                                const userid = users.find(userid => userid.id === item.sender);

                                return (
                                    <div onMouseOver={() => { selectItem(item.id), selectUserid(item.sender) }} className="border w-11/12 cursor-pointer mx-auto  h-16 rounded-md mb-2 flex items-center px-3 justify-center shadow-md" key={i}>
                                        <div className="w-11/12 flex items-center justify-between">
                                            <div className="flex items-center gap-3  w-3/4">
                                                {users?.image ? <img src={`${profileImg}/profiles/${users?.image}`} alt="" />
                                                    :
                                                    <FaRegUser className='text-2xl' />
                                                }
                                                <div className="flex items-center flex-col gap-2 ">
                                                    <h3>{userid?.username}</h3>
                                                    <h3>{userid?.createdAt}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=""></div>
                                        <div className={`${userid?.status === 'offline' ? 'text-gray-500' : 'text-green-500'}`}>{userid?.status}</div>
                                    </div>
                                )
                            })}
                        </div> :
                        <div className="test-center font-bold text-2xl">No chats here</div>
                    }
                </div>

            </>}
            {screen === 2 && <>
                {/* <div className="text-center font-bold main ">Chats with users</div> */}
                <div className=" w-full mt-14">
                    <AdminChatRoom probchat={probchat} msgs={msgs} selectedUser={selectedUser} selected={select} setScreen={setScreen} />
                </div>
            </>}
        </div>
    )
}

export default ChatPage