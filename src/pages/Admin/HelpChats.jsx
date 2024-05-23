import React, { useCallback, useEffect, useState } from 'react'
import FAQs from '../../components/FAQs'
import { BsChatSquareTextFill } from "react-icons/bs";
import FormInput from '../../components/FormInput';
import { errorMessage, successMessage } from '../../components/utils/UtilNames';
import ChatRoom from '../../components/ChatRoom';
import { Apis, GetApi, PostApi } from '../../services/Apis';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchAdminProfile, dispatchChats, dispatchRoomid } from '../../app/reducer';
import ChatsHistory from '../../components/ChatsHistory';
import { useQuery } from '@tanstack/react-query';
import { MoveToTop } from '../../components/utils/functions';
import InactiveMessages from '../../components/InactiveMessages';

const HelpChats = ({ setLive, setLiveName }) => {

  const [screen, setScreen] = useState(1)
  const [chathistory, setChatHistory] = useState(false)
  const [inactivechats, setInactiveChats] = useState([])
  const [activechats, setAtiveChats] = useState({})
  const [loading, setLoading] = useState(false)
  const [adminstatus, setAdminStatus] = useState('')
  const [id, setId] = useState()
  const dispatch = useDispatch()
  const [activeid,setActiveId]= useState(null)
  const [stat, setStat] = useState('')
  const [chats, setChats] = useState(false)
  const [chatsArr, setChatsArr] = useState([])
  const [load2, setLoad2] = useState(false)

  const fetchActiveChats = async () => {
    setLoading(true)
    try {
      const response = await GetApi(Apis.Chats.fetch_active_rooms)
      //  console.log(response)
      if (response.status === 200) {
        setAtiveChats(response.data[0]?.friend)
      } else {
        errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchInActiveChats = async () => {
    setLoad2(true)
    try {
        const response = await GetApi(Apis.Chats.fetch_inactive_rooms)
        // console.log(response)
        if (response.status === 200) {
            setInactiveChats(response.data)
        } else {
            errorMessage(response.msg)
        }
    } catch (error) {
        errorMessage(`Error: ${error.message}`)
    } finally {
        setLoad2(false)
    }
}



  const fetchAdmin = useCallback(
    async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.admins.admin_profile)
        // return console.log(response.data[0].id)
        if (response.status === 200) {
          // setAdminProfile(response.data[0])
          const id = response.data[0].id
          dispatch(dispatchAdminProfile(id))
          setAdminStatus(response.data[0].status)
        }
      } catch (error) {
        errorMessage(`Error from fetchAdmin${error.message}`)
      } finally {
        setLoading(false)
      }
    }
    , [])

  useEffect(() => {
    fetchAdmin()
    fetchActiveChats()
  }, [])
  const adminprofile = useSelector((state) => state.data.adminprofile)
  const Openchats = async () => {
    setScreen(2)
    setLive(true)
    setLiveName('Live-Chat')
    MoveToTop()
    // console.log(adminprofile)
  //       setLiveName('Live-Chat')
  }



  return (
    <div className='mt-20 w-11/12 mx-auto h-fit pb-5  '>
      {screen === 1 && <>
        <div className="h-full">
          <div className="text-center main text-2xl font-bold underline backdrop-blur-xl">How can we help you?</div>
          <p className='text-sm text-center mt-3'>Review our Frequently Asked Questions to satisfy your curiosity</p>
        </div>
        <div className="w-full mt-5">
          <FAQs />
        </div>
        <div onClick={Openchats} className="mt-10 ml-auto cursor-pointer animate-bounce">
          <BsChatSquareTextFill className='text-3xl main' />
        </div>
      </>}
      {screen === 2 && <>
        <div className="mt-24">
          <ChatsHistory fetchActive={fetchActiveChats} load2={load2} fetchInactive={fetchInActiveChats} inactivechats={inactivechats} setActiveId={setActiveId}  setLive={setLive}  setChatsArr={setChatsArr} screen={screen} activechats={activechats} stat={stat} chats={chats} setChats={setChats} setStat={setStat} status={adminstatus} setScreen={setScreen} roomid={activeid} />
        </div>
      </>}
      {screen === 3 && <>
        <ChatRoom status={adminstatus} fetchActive={fetchActiveChats} activechats={activechats} stat={stat} chats={chats} id={activeid} setStat={setStat} setScreen={setScreen} setChats={setChats} />
      </>}
      {screen === 4 && <>
        <InactiveMessages roomid={id} chatsArr={chatsArr} setScreen={(setScreen)} status={adminstatus}/>
      </>}
    </div>

  )
}

export default HelpChats