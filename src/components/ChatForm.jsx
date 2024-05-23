import React, { useEffect, useRef, useState } from 'react'
import { FaPlus, FaRegPaperPlane, FaRegSmile } from 'react-icons/fa'
import { MdOutlineAttachment } from "react-icons/md";
import { EmojiPicker, Emoji } from "react-emoji-search";
import { MoveToBottom } from './utils/functions';
import { useSelector } from 'react-redux';
import { errorMessage } from './utils/UtilNames';
import { Apis, PostApi, socket } from '../services/Apis';

const ChatForm = ({roomid,sendmessage}) => {

  const textRef = useRef(null)
  const refDiv = useRef(null)
  const [text, setText] = useState('')
  const [icon, setIcon] = useState(false)

 


  const handleEmoji = (val) =>{
    const textarea = textRef.current;
    const start = textarea.selectionStart; 
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + val + text.substring(end);
    setText(newText);
    textarea.focus();
    MoveToBottom()
  }

  useEffect(()=>{
    if(refDiv){
      window.addEventListener('click', (e)=>{
        if(refDiv.current !== null){
          if(refDiv.current.contains(e.target)){
          }else{
            setIcon(false)
          }
        }
      },true)
    }
  },[])

  // const roomid = useSelector((state) => state.data.roomid)
  const SubmitContent = async () => {
    const formdata = {
      roomid:roomid,
      content:text
    }
    try {
      const response = await PostApi(Apis.Chats.send_chat,formdata)
      if(response.status === 200){
        sendmessage()
        setText('')
      }
    } catch (error) {
      errorMessage(error.message)
    }

  }
  return (
    <div className='text-black relative flex h-[13dvh] '>
      <div className="flex items-center w-11/12 gap-3 pt-2 mx-auto">
        <button onClick={() => setIcon(prev => !prev)}>
          <FaRegSmile className={`md:text-2xl ${icon ?'text-green-500':'text-zinc-400'} text-xl`} />
        </button>
        {icon &&
        <div ref={refDiv} className="absolute h-[20rem] w-11/12 bottom-16 abs rounded-md">
          <EmojiPicker
          emojiSize={24}
          emojiSpacing={8}
          onEmojiClick={(emoji)=> handleEmoji(emoji)}
          />
        </div>
        }
        <button>
          <label>
            <MdOutlineAttachment className="md:text-2xl text-xl text-blue-400" />
            <input type="file" hidden />
          </label>
        </button>
        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='scroll md:h-16 min-h-[15px] h-14 mx-auto pt-3 md:pt-5 border-2 rounded-md w-11/12 outline-none pl-2  resize-none' placeholder='Message'>

        </textarea>
       {text.length > 0 && <button
          onClick={SubmitContent}
          className="text-2xl ">
          <FaRegPaperPlane />
        </button>}
      </div>

    </div>
  )
}


export default ChatForm