import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHome from './AdminHome'
import PendingDeposits from '../admincomponents/PendingDeposits'
import ConfirmedDeposits from '../admincomponents/ConfirmedDeposits'
import ConfirmedWithdrawals from '../admincomponents/ConfirmedWithdrawals'
import PendingWithdrawals from '../admincomponents/PendingWithdrawals'
import { useSelector } from 'react-redux'
import { errorMessage } from '../../components/utils/UtilNames'
import { Apis, GetApi } from '../../services/Apis'
import SubmittedKYCS from '../admincomponents/SubmittedKYCS'
import Logout from '../admincomponents/Logout'
import { FaBars } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import ChatPage from '../admincomponents/Chats/ChatPage'


const AdminControl = () => {

  const [active, setActive] = useState('home')
  const [profile, setProlfile] = useState({})
  const refdiv = useRef(null)
  const [nav, setNav] = useState(false)

  const fetchProfile = useCallback(async () => {
    try {
      const response = await GetApi(Apis.auth.profile)
      if (response.status === 200) {
        setProlfile(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }

  }, [])
  useEffect(() => {
    fetchProfile()
  }, [active])

  const switchPages = (page) => {
    setActive(page)
  }

  const Icon = nav ? GrClose : FaBars

  useEffect((e) => {
    if (refdiv) {
      window.addEventListener('click', (e) => {
        if (refdiv.current !== null) {
          if (refdiv.current.contains(e.target)) {

          } else {
            setNav(false)
          }
        }
      }, true)
    }
  }, [])
  const heightInc = {
    height: nav === true ? '22rem ' : '3rem',
    transition: nav === true ? 'height ease-in-out 0.4s' : 'height ease-in-out 0.3s'
  }
  return (
    <div className='w-full h-fit '>
      <div className="w-full h-full ">
        <div className="flex w-full h-full gap-10">
          <div className=" w-[25%] mainbg fixed h-full px-4 hidden md:block">
            <div className="mt-5 w-11/12 ">
              <h1 className='md:text-white text-xl  capitalize'>Welcome, Admin {profile.username} </h1>
            </div>
            <div className="w-11/12 mx-auto mt-20 flex flex-col h-[30rem] gap-5  px-3 overflow-y-auto scroll2">
              <Link onClick={() => switchPages('home')} className={`${active === 'home' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Home</Link>

              <Link onClick={() => switchPages('con-depo')} className={`${active === 'con-depo' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Confirmed Deposits</Link>

              <Link onClick={() => switchPages('con-with')} className={`${active === 'con-with' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Confirmed Withdrawals</Link>

              <Link onClick={() => switchPages('deposit')} className={`${active === 'deposit' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Pending Deposits</Link>

              <Link onClick={() => switchPages('withdrawal')} className={`${active === 'withdrawal' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Pending Withdrawals</Link>

              <Link onClick={() => switchPages('kyc')} className={`${active === 'kyc' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Submitted KYCs</Link>

              <Link onClick={() => switchPages('logout')} className={`${active === 'logout' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Logout</Link>
              <Link onClick={() => switchPages('chats')} className={`${active === 'chats' ? 'bg-white main rounded-md' : 'text-white'} px-4 py-1 `}>Chats</Link>
            </div>
          </div>
          <div className=" md:w-[75%] w-full  h-full ml-auto">
            <div style={heightInc} className="flex md:hidden items-center flex-col justify-between shadow-lg w-full py-3 fixed z-50 bg-white mb-5">
              <div className="flex w-full items-center justify-between px-5">
                <Icon onClick={() => setNav(prev => !prev)} className='text-3xl cursor-pointer' />
                <div className="text-sm mr-4">Welcome Admin, <span className='main font-bold'>{profile?.username}</span>
                </div>
              </div>
              <div ref={refdiv} className={`w-full md:hidden mainbg  text-white py-4 mt-3 mx-auto  flex flex-col  gap-5  px-3 text-center ${nav ? 'flex' : 'hidden'}  `}>
                <Link onClick={() => { switchPages('home'), setNav(false) }} >Home</Link>

                <Link onClick={() => { switchPages('con-depo'), setNav(false) }} >Confirmed Deposits</Link>

                <Link onClick={() => { switchPages('con-with'), setNav(false) }} className={``}>Confirmed Withdrawals</Link>

                <Link onClick={() => { switchPages('deposit'), setNav(false) }} className={` `}>Pending Deposits</Link>

                <Link onClick={() => { switchPages('withdrawal'), setNav(false) }} className={` `}>Pending Withdrawals</Link>

                <Link onClick={() => { switchPages('kyc'), setNav(false) }} className={``}>Submitted KYCs</Link>

                <Link onClick={() => { switchPages('logout'), setNav(false) }} className={` `}>Logout</Link>
                <Link onClick={() => { switchPages('chats'), setNav(false) }} className={` `}>Chats</Link>
              </div>
            </div>

            {active === 'home' &&
              <AdminHome />
            }
            {active === 'deposit' &&
              <PendingDeposits setActive={setActive} />
            }
            {active === 'con-depo' &&
              <ConfirmedDeposits />
            }
            {active === 'con-with' &&
              <ConfirmedWithdrawals />
            }
            {active === 'withdrawal' &&
              <PendingWithdrawals setActive={setActive} />
            }
            {active === 'kyc' &&
              <SubmittedKYCS setActive={setActive} />
            }
            {active === 'logout' &&
              <Logout setActive={setActive} />
            }
            {active === 'chats' &&
              <ChatPage setActive={setActive} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminControl