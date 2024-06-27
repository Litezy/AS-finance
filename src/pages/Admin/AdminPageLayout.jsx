import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageLayout from '../../components/PageLayout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosSettings, IoMdArrowDropup, IoMdCloudDownload } from 'react-icons/io'
import { AiOutlineDashboard } from 'react-icons/ai'
import { IoHomeOutline } from "react-icons/io5";
import { FaBars, FaCheckCircle, FaChevronDown,FaChevronUp, FaRegMoneyBillAlt } from "react-icons/fa";
import { RiFundsBoxFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import AdminProfile from './AdminProfile'
import { FaArrowRight } from "react-icons/fa6";
import Home from './Home'
import Deposit from './Deposit'
import { CgLogOut } from "react-icons/cg";
import Wallet from './Withdraws'
import TransactionHistory from './TransactionHistory'
import Investments from './Investments'
import Settings from './Settings'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
import { errorMessage, successMessage } from '../../components/utils/UtilNames'
import { Apis, GetApi, PostApi, auth_urls, profileImg } from '../../services/Apis'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../store/store'
import Withdraws from './Withdraws'
import { GiCash, GiWallet } from "react-icons/gi";
import Notifications from './Notifications'
import {useSelector,useDispatch} from 'react-redux'
import { dispatchNotification } from '../../app/reducer'
import {useQuery} from '@tanstack/react-query'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { CookieName } from '../../components/utils/UtilNames'
import { FaBarsStaggered } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import VerifyEmail from '../../components/VerifyEmail'
import notifyImg  from '../../assets/notifyimg.png'
import chatImg  from '../../assets/chatimg.png'
import { TfiHelpAlt } from "react-icons/tfi";
import HelpChats from './HelpChats'
import { FaRegUser } from "react-icons/fa";

const AdminPageLayout = () => {
  const [active, setActive] = useState('home')
  const [toggle, setToggle] = useState(false)
  const Icon = toggle === true ? FaChevronUp : FaChevronDown
  const [showComp, setShowComp] = useState('')
  const [log, setLog] = useState(false)
  const [togglelogout, setToggleLogout] = useState(false)
  const [profileIcon, setProfileIcon] = useState(false)
  const [notifications,setNotifications] = useState([])
  const [hasnotify, sethasnotify] = useState(false)
  const [trigger, settrigger] = useState(true)
  const profile = useSelector(state => state.data.profile)
  const dispatch = useDispatch()
 const refdiv = useRef(null)
 const smallV = useRef(null)
 const [notifylength,setNotifylength] = useState()
 const notify = useDispatch()
 const logoutdiv = useRef(null)
 const [smallview, setSmallView] = useState(false)

 
  const fetchNotifications = useCallback(async () => {
    const response = await GetApi(Apis.auth.notify)
     const notifyData = response.data
     const hasNotification = notifyData.filter(notification => notification.status === 'unread');
     if(hasNotification){ 
      sethasnotify(response.data)
      dispatch(dispatchNotification(response.data))
      setNotifylength(hasNotification.length)
      settrigger(false) 
     }else{
      errorMessage('sorry something went wrong')
     }
  },[])
     
  useEffect(()=>{
    fetchNotifications()
  },[active,setActive,trigger,settrigger])


  const {data} = useQuery({
    queryKey:['user-profile'],
    queryFn: async () =>{
      const response = await GetApi(auth_urls.profile)
      return response.data
    }
  })

const [sets,setSets] = useState(false)
const [setsname,setSetsName] = useState('')
const [livename,setLiveName] = useState('')
const [live,setLive] = useState(false)
const [chats, setChats] = useState(false)
 
//  console.log(data, profile)
 useEffect(()=>{
  if(refdiv){
    window.addEventListener('click',(e)=>{
          if(refdiv.current !== null){
            if(refdiv.current.contains(e.target)){
              console.log('current')
            }else{
              setProfileIcon(false)
            }
          }
    }, true)
  }
 },[])
 useEffect(()=>{
  if(logoutdiv){
    window.addEventListener('click',(e)=>{
          if(logoutdiv.current !== null){
            if(logoutdiv.current.contains(e.target)){
              console.log('current')
            }else{
              setLog(false)
            }
          }
    }, true)
  }
 },[])
 useEffect(()=>{
  if(smallV){
    window.addEventListener('click',(e)=>{
          if(smallV.current !== null){
            if(smallV.current.contains(e.target)){
              console.log('current')
            }else{
              setSmallView(false)
            }
          }
    }, true)
  }
 },[])
 const Icon1 = profileIcon === true? FaChevronDown: FaChevronUp


const navigate = useNavigate()
 const logoutUser = async ()=>{
    try {
      const response = await PostApi(Apis.auth.logout)
      // return console.log(response)
      if(response.status === 200){
        successMessage(response.msg)
        Cookies.remove(CookieName)
        navigate('/login')
      }else{
        errorMessage(response.msg)
      }
    } catch (error) {
      return errorMessage(error.message)
    }
 }

 const changeScreen = ()=>{
  setActive('help')
 }
  return (  
 <>
    <div className={`w-full relative ${profile.email_verified=== 'false' && 'signup h-screen '}`}>
          {profile.email_verified=== 'false' &&
          <div className="h-full w-3/4  mx-auto ">
            <VerifyEmail data={data}/>
          </div>}
       {profile.email_verified=== 'true' && <div className=" mx-auto h-full flex items-start gap-10  relative ">
        {smallview &&  
        <div ref={smallV} style={{left: smallV ? '0' : '[-50%]'}} 
        className={` ${smallview ? 'w-[55%] transition-all ease-in-out duration-500':'-w-[20%]'} side-nav ml-0.5 h-screen rounded-e-xl z-50 fixed top-0 left-0 mainbg md:hidden overflow-y-auto`}>
            <div onClick={()=> setSmallView(false)} className="w-fit ml-auto mr-6 mt-2 ">
            <GrClose  className='text-3xl text-white cursor-pointer' />
            </div>
            <div className="flex flex-col text-white items-left h-fit py-10 pl-2 text-sm overflow-y-auto scroll ">
                  <div className="text-left mb-5 uppercase text-slate-300">Account</div>
              <ul className={` flex  ${togglelogout ? 'gap-10': 'gap-8'}  flex-col w-11/12  font-medium items-left  ml-2 mx-auto `} >
                <li onClick={() => {setActive('home'),setSmallView(false)}}
                  className={`flex ${active === 'home' ? 'bg-white text-[#201658] py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <div onClick={() => {setToggle(prev => !prev), setShowComp('')}} className="flex w-full items-center justify-between pr-4">
                    <div className="flex gap-3">
                      <IoHomeOutline className='text-xl' />
                      <Link>Overview</Link>
                    </div>
                  </div>
                  
                </li>
                <li onClick={() => {setActive('deposit'), setSmallView(false)}} className={`flex ${active === 'deposit' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <GiCash className='text-xl' />
                  <Link>Deposits</Link>
                </li>
                <li onClick={() => {setActive('withdraw'), setSmallView(false)}} className={`flex ${active === 'withdraw' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <GiWallet className='text-xl' />
                  <Link>Withdrawals</Link>
                </li>
                <li onClick={() => {setActive('investment'), setSmallView(false)}} className={`flex ${active === 'investment' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <RiFundsBoxFill className='text-xl' />
                  <Link>Investments</Link>
                </li>
                <li onClick={() => {setActive('transaction'), setSmallView(false)}} className={`flex ${active === 'transaction' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <FaHistory className='text-xl' />
                  <Link>Transaction History</Link>
                </li>
                <li onClick={() => {setActive('profile'), setSmallView(false)}} className={`flex ${active === 'profile' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <ImProfile className='text-xl' />
                  <Link>Profile</Link>
                </li>
                <li onClick={() => {setActive('help'), setSmallView(false)}} className={`flex ${active === 'help' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <TfiHelpAlt className='text-xl' />
                  <Link>Help</Link>
                </li>
                </ul>
              </div>
              <div className="text-left mb-5 uppercase text-slate-300 mt-2 pl-2">others</div>
                <ul className={`flex gap-5  flex-col w-11/12 font-medium items-left text-white  ml-2 mx-auto`}>
                  <li onClick={() => {setActive('settings'), setSmallView(false)}} 
                         className={`flex ${active === 'settings' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <IoIosSettings className='text-xl' />
                  <Link>Settings</Link>
                </li>
                <li onClick={() => {setActive('notifications'), setSmallView(false)}} className={`flex ${active === 'notifications' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                <IoMdNotificationsOutline className='text-xl' />
                  <Link>Notifications</Link>
                </li>
                <li onClick={() => setActive('logout')} className={`flex ${active === 'logout' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                <CgLogOut className='text-xl' />
                  <Link>Logout</Link>
                </li>
                </ul>
                
        </div>
        
        }
    <div className="">
    </div>


      <div className="w-[25%] h-fit fixed top-0 left-0  border-r-2 bg-[#430a5d] hidden md:block rounded-e-none  ">
            <div className="w-11/12 mx-auto text-white mt-5  h-fit py-5 ">
           <div className="flex items-center gap-4 mb-5 relative">
           { data?.image ? <img src={`${profileImg}/profiles/${data?.image}`} alt="" className='w-10 h-10 rounded-full object-cover' />: <FaRegUser className='text-2xl'/>}
           <div className="capitalize font-bold text-2xl">Hi, {data?.username}</div>
           {data?.kyc_status === 'verified' && 
           <div className="absolute top-0 md:right-32"><BsFillPatchCheckFill className='text-sm text-blue-500'/></div>}
           </div> 
              <div className="flex flex-col text-white items-left h-[30rem] py-10 text-sm overflow-y-auto scroll ">
                  <div className="text-left mb-5 uppercase text-slate-300">Account</div>
              <ul className={` flex  ${togglelogout ? 'gap-10': 'gap-8'}  flex-col w-11/12  font-medium items-left  ml-2 mx-auto `} >
                <li onClick={() => setActive('home')}
                  className={`flex ${active === 'home' ? 'bg-white text-[#201658] py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <div onClick={() => {setToggle(prev => !prev), setShowComp('')}} className="flex w-full items-center justify-between pr-4">
                    <div className="flex gap-3">
                      <IoHomeOutline className='text-xl' />
                      <Link>Overview</Link>
                    </div>
                  </div>
                  
                </li>
                <li onClick={() => {setActive('deposit'), setToggle(false)}} className={`flex ${active === 'deposit' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <GiCash className='text-xl' />
                  <Link>Deposits</Link>
                </li>
                <li onClick={() => {setActive('withdraw'), setToggle(false)}} className={`flex ${active === 'withdraw' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <GiWallet className='text-xl' />
                  <Link>Withdrawals</Link>
                </li>
                <li onClick={() => setActive('investment')} className={`flex ${active === 'investment' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <RiFundsBoxFill className='text-xl' />
                  <Link>Investments</Link>
                </li>
                <li onClick={() => setActive('transaction')} className={`flex ${active === 'transaction' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`}>
                  <FaHistory className='text-xl' />
                  <Link>Transaction History</Link>
                </li>
                <li onClick={() => setActive('profile')} className={`flex ${active === 'profile' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <ImProfile className='text-xl' />
                  <Link>Profile</Link>
                </li>
                <li onClick={() => setActive('help')} className={`flex ${active === 'help' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <TfiHelpAlt className='text-xl' />
                  <Link>Help</Link>
                </li>
                
                
              </ul>
             <div className="text-left mb-5 uppercase text-slate-300 mt-5">others</div>
                <ul className={`flex  ${togglelogout ? 'gap-10': 'gap-8'}  flex-col w-11/12 font-medium items-left  ml-2 mx-auto`}>
                  <li onClick={() => setActive('settings')} 
                         className={`flex ${active === 'settings' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                  <IoIosSettings className='text-xl' />
                  <Link>Settings</Link>
                </li>
                <li onClick={() => setActive('notifications')} className={`flex ${active === 'notifications' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-left pl-5 gap-2 cursor-pointer`} >
                <IoMdNotificationsOutline className='text-xl' />
                  <Link>Notifications</Link>
                </li>
                <li onClick={() => {setToggleLogout(prev => !prev)}} className={`flex w-full ${active === 'logout' ? 'bg-white text-[#201658]  py-2 rounded-sm ' : ''} items-center justify-between pl-5 gap-2 cursor-pointer`} >
                 <div className="flex gap-2">
                 <CgLogOut className='text-xl text-white font-bold' />
                  <Link>Logout</Link>
                 </div>
                {togglelogout === true ? 
                <IoMdArrowDropup  className='text-white'/>
                : 
                <IoMdArrowDropdown  className='text-white'/>
                }
                
                </li>
                {togglelogout && <div  className='w-11/12 px-3 h-fit py-2 mx-auto  border-white'>
              <div className="w-full  ">
                <h4 className='text-center text-sm'>Confirm Logout!</h4>
                <div className="flex w-full items-center justify-between mt-2">
                  <button onClick={() => setToggleLogout(false)} className='px-6 py-1 bg-white text-[#201658]  rounded-full'>cancel</button>
                  <button onClick={logoutUser}  className='px-6 py-1 bg-green-600 rounded-full'>proceed</button>
                </div>
              </div>
              </div>}
           </ul>
              </div>
            </div>
           </div>

            <div className="md:w-[75%] w-full md:ml-auto h-fit  rounded-sm bg-[#fff] relative">
            {log && <div ref={logoutdiv} className="w-3/4 z-50 mx-auto h-screen fixed top-0 bg-black/20 flex items-center justify-center">
            <div className="w-[70%] rounded-md h-32 bg-white ">
             <h1 className='text-center font-bold mt-8 text-xl main'>Confirm Logout</h1>
                 <div className="flex w-11/12 mx-auto items-center justify-between text-white">
                   <button onClick={()=> setLog(false)} className='px-5 py-2 bg-red-500 rounded-xl'>Cancel</button>
                 <button onClick={logoutUser} className='px-5 py-2 bg-green-500 rounded-xl'>Proceed</button>
                 </div>
            </div>
           </div>}
            <div className={`flex md:w-3/4 ${smallview ? 'z-40' :'z-50'} w-full  items-center justify-between bg-[white] shadow-md px-4 md:px-3 py-3 fixed`}>
              <div className="md:flex hidden items-center justify-start gap-3 h-12">
                <Link onClick={() => setActive('home')} className=" text-[#430a5d] font-bold cursor-pointer ">Dashboard</Link>
                <FaChevronRight className='text-[#430a5d] text-sm' />
                {active === 'home' && <p className=' font-bold  text-black'>Overview</p>}
                {active === 'deposit' && <p className='font-bold  text-black'>Deposits</p>}
                {active === 'withdraw' && <p className='font-bold  text-black'>Withdraws</p>}
                {active === 'investment' && <p className='font-bold  text-black'>Investments</p>}
                {active === 'help' && !live && <p className='font-bold  text-black'>Help</p>}
                {active === 'help' && live && <div className='font-bold  text-black'>
                <div className="flex items-center gap-3">
                    <p>Help</p>
                    <FaChevronRight className='text-[#430a5d] text-sm' />
                    <p>{livename}</p>
                  </div>
                  </div>}
                {active === 'transaction' && <p className='font-bold  text-black'>Transaction History</p>}
                {active === 'profile' && <p className='font-bold  text-black'>Profile</p>}
                {active === 'settings'  && !sets && <p className='font-bold  text-black'>Settings</p>}
                {active === 'settings'  && sets && <div className='font-bold  text-black'>
                  <div className="flex items-center gap-3">
                    <p>Settings</p>
                    <FaChevronRight className='text-[#430a5d] text-sm' />
                    <p>{setsname}</p>
                  </div>
                  </div>}
                {active === 'notifications' && <p className='font-bold  text-black'>Notifications</p>}
              </div>
              <div  onClick={()=> setSmallView(prev => !prev)} className="text-sm md:hidden text-[#430a5d] "><FaBarsStaggered className='text-2xl cursor-pointer'/></div>
              <div className="flex w-[37%] md:w-[20%] items-center gap-3 relative">
                <div className="block">
                <div onClick={()=>setActive('notifications')} className={` ${notifylength === 0 ?'px-2': 'px-3'}  cursor-pointer py-2 rounded-md bg-[#f0f4f8]  border relative`}> 
                  <img src={notifyImg} className='w-5' alt="" />
               {hasnotify && <div className={`${notifylength === 0 ?'': 'bg-red-500'} w-[16px] rounded-md text-[9px] flex items-center justify-center text-white font-bold  absolute  right-2 top-0`}>{notifylength === 0 ?'': notifylength}</div>}
                </div>
                </div>
                <div className="flex items-center gap-5 md:relative">
                 <img onClick={changeScreen} src={chatImg} className='w-10 cursor-pointer' alt="" />
                  {data?.image ?<img onClick={() => setActive('profile')} src={`${profileImg}/profiles/${data?.image}`} alt="" className='w-8 h-8 object-cover rounded-full cursor-pointer' />: <FaRegUser className='text-black text-xl'/>}
                  {data?.kyc_status === 'verified' && <div className="absolute top-0 right-0 pl-4 md:right-5"><BsFillPatchCheckFill className='text-xs text-blue-500'/></div>}
                  <Icon1 onClick={() => setProfileIcon(prev => !prev)} className='text-sm cursor-pointer hidden md:block'/>
             
                </div>
              </div>
               {profileIcon === true && <>
                <div ref={refdiv} className="absolute top-20 rounded-md bg-[#fff]  right-2 h-fit py-5 w-48 font-bold">
                <div className="w-11/12 mx-auto flex flex-col text-sm capitalize items-center justify-start">
                 <div className="flex flex-col gap-2">
                        <div onClick={() =>{setActive('profile'), setProfileIcon(false)}} className="flex  items-center gap-3 cursor-pointer">
                         <ImProfile className='text-lg' />
                    <button>My profile</button>
                   </div>
                <div onClick={() =>{setActive('settings'), setProfileIcon(false)}} className="flex items-center gap-3 cursor-pointer  border-b w-full mb-3">
                <IoIosSettings className='text-lg'/>
                   <button>Settings</button>
                </div>
                 <div  className="flex items-center  gap-3 cursor-pointer">
                <CgLogOut className='text-lg'/>
                <button onClick={() =>{setLog(true), setProfileIcon(prev => !prev)}}>Logout</button>
               </div>
               </div>
             </div>
           </div>
           </>}
            </div>
            <div className="div w-full h-fit">
              {active === 'home' && <div className="">
              <Home setTrigger={settrigger} setactive={setActive} /></div>}
            
            {active === 'deposit' && <div className="">
              <Deposit 
              setactive={setActive}
              setTrigger={settrigger}
              />
              </div>}
            {active === 'withdraw' && <div className="">
              <Withdraws setactive={setActive} 
              setTrigger={settrigger}
              /></div>}
            {active === 'investment' && <div className="">cd 
              <Investments /></div>}
            {chats && <div className="">
              <HelpChats setLive={setLive} setLiveName={setLiveName}/></div>}
            {active === 'help' && <div className="">
              <HelpChats setLive={setLive} setLiveName={setLiveName}/></div>}
            {active === 'notifications' && <div className="">
              <Notifications settrigger={settrigger}/></div>}
            {active === 'transaction' && <div className="">
              <TransactionHistory /></div>}
            {active === 'settings' && <div className="">
              <Settings 
              data={data} 
              setActive={setActive}
              setSets={setSets}
              setSetsName={setSetsName}/></div>}
            {active === 'profile' && <div className="">
              <AdminProfile profile={profile} /></div>}
            </div>
          </div>
        </div>}
      </div>
 </>
     
    // </PageLayout>
  )
}

export default AdminPageLayout




















// {toggle === true && active === 'home' && <>
//                      <div className=" top-6 w-full bg-white h-20 -mt-5 rounded-md flex items-center justify-start">
//                       <div className="flex items-start flex-col text-black ml-3 w-full gap-3">
//                         <button onClick={() => setShowComp('first')} className="w-11/12 mx-auto  hover:bg-[#f9751a] hover:text-white hover:px-1 hover:py-1 hover:rounded-md flex items-center justify-between">
//                           <h1>Overview1</h1>
//                           <FaArrowRight/>
//                           </button>
                      
//                         <button onClick={() => setShowComp('second')} className="w-11/12 mx-auto  hover:bg-[#f9751a] hover:text-white hover:px-1 hover:py-1 hover:rounded-md flex items-center justify-between">
//                           <h1>Overview2</h1>
//                           <FaArrowRight/>
//                           </button>
//                       </div>
//                      </div>
//                     </>}