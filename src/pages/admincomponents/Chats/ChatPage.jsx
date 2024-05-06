import React, { useState } from 'react'
import Chats from './Chats'
import chatImg1 from '../../../assets/chats1.jpg'
import chatImg2 from '../../../assets/chats2.jpg'
import chatImg3 from '../../../assets/chats3.jpg'
import ChatRoom from './ChatRoom'

const ChatPage = () => {
    const [select, setSelect] = useState({})
    const [screen, setScreen] = useState(1)
    const chatsMsg = [
        {
            username: 'mrlite',
            image: chatImg1,
            status: 'online',
            id: 1
        },
        {
            username: 'litezy',
            image: chatImg2,
            status: 'online',
            id: 2
        },
        {
            username: 'bethel',
            image: chatImg3,
            status: 'offline',
            id: 3
        },
    ]

    const selectItem = (id) => {
        setSelect(select => {
            const selected = chatsMsg.filter((item) => item.id === id)
            select = selected
            return select
        })
    }
    return (
        <div className='mt-16 w-11/12 mx-auto'>
            {screen === 1 && <>
                <div className="text-center font-bold main">Chats with users</div>
                {chatsMsg.map(chat => <Chats key={chat.id} chat={chat} selectedItem={selectItem} setScreen={setScreen} select={select} />)}
            </>}
            {screen === 2 && <>
                <div className="text-center font-bold main">Chats with users</div>
                <ChatRoom selected={select} setScreen={setScreen}/>
            </>}
        </div>
    )
}

export default ChatPage