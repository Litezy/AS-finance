import React, { Children, useEffect, useRef, useState } from 'react'
import { RiFundsBoxLine, RiFundsLine } from "react-icons/ri";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import AdminPageLayout from './AdminPageLayout';
import plus from '../../assets/plus.png'
import { SlWallet } from "react-icons/sl";
import { GiWallet } from "react-icons/gi";
import { GiCash } from "react-icons/gi";
import { Link, json } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Loading from '../../components/Loading';
import { errorMessage, formatter } from '../../components/utils/UtilNames';
import { Apis, GetApi } from '../../services/Apis';
import Loader from '../../components/utils/Loader';
import moment from 'moment';
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaRegMoneyBillAlt } from 'react-icons/fa'


const Home = ({ sideview, image, setactive, setTrigger }) => {

  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [slash, setSlash] = useState(false)
  const [slash1, setSlash1] = useState(false)
  const [slash2, setSlash2] = useState(false)
  const [balance, setbalance] = useState([])
  const [load, setLoad] = useState(false)
  const [alltrnx, setAlltrnx] = useState([])
  const [slash3, setSlash3] = useState(false)
  const [slash4, setSlash4] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pendingdepo, setPendingDepo] = useState(false)
  const [pendingwith, setPendingWith] = useState(false)
  const [pendingWithdrawals, setPendingWithdrawals] = useState([])
  const [pendingDeposits, setPendingDeposits] = useState([])
  const [pendingdepoBalance, setPendingdepoBalance] = useState(0)
  const [pendingwithBalance, setPendingwithBalance] = useState(0)
  const refDiv = useRef(null)
  //  const refDiv1 = useRef(null)
  const updateToggle = () => {
    setToggle((prev) => !prev)
  }
  const updateToggle2 = () => {
    setToggle2((prev) => !prev)
  }

  const Icon = toggle === true ? FaToggleOn : FaToggleOff
  const Icon2 = toggle2 === true ? FaToggleOff : FaToggleOn
  const Icon3 = slash === true ? FaEye : FaEyeSlash
  const Icon4 = slash1 === true ? FaEye : FaEyeSlash
  const Icon5 = slash2 === true ? FaEye : FaEyeSlash
  const Icon6 = slash3 === true ? FaEye : FaEyeSlash
  const Icon7 = slash4 === true ? FaEye : FaEyeSlash

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.auth.balance)
        if (response.status === 200) {
          setLoad(true)
          setbalance(response)
        }
      } catch (error) {
        errorMessage('failed to load balance')
        setLoad(false)
      } finally {
        setLoading(false)
      }
    }
    fetchBalances()
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.auth.all_trnx)
        if (response.status === 200) {
          setAlltrnx(response.data)
          setLoad(true)
        }
      } catch (error) {
        errorMessage(error.message)
        setLoad(false)
      } finally {
        setLoading(false)
      }
    }
    const fetchAllPendingDeposits = async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.auth.pending_deposits)
        if (response.status === 200) {
          setPendingDeposits(response.data)
          setPendingdepoBalance(response.total)
        }
      } catch (error) {
        errorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
    const fetchAllPendingWithdraws = async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.auth.pending_withdraws)
        if (response.status === 200) {
          setPendingWithdrawals(response.data)
          setPendingwithBalance(response.total)
        }
      } catch (error) {
        errorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
    setTrigger(prev => !prev)
    fetchAllPendingDeposits()
    fetchAllPendingWithdraws()
  }, [])
  const hideBalance = () => {
    setSlash(prev => !prev)
  }
  const hideBalance1 = () => {
    setSlash1(prev => !prev)
  }
  const hideBalance2 = () => {
    setSlash2(prev => !prev)
  }
  const hideBalance3 = () => {
    setSlash3(prev => !prev)
  }
  const hideBalance4 = () => {
    setSlash4(prev => !prev)
  }

  const handleAllClicksFalse = () => {
    if (!slash) {
      setSlash(true)
    }
    if (!slash1) {
      setSlash1(true)
    }
    if (!slash3) {
      setSlash2(true)
    }
    if (!slash3) {
      setSlash3(true)
    }
    if (!slash4) {
      setSlash4(true)
    }
    setHidden(true)

  }
  const handleAllClicksTrue = () => {

    if (slash) {
      setSlash(false)
    }
    if (slash1) {
      setSlash1(false)
    }
    if (slash3) {
      setSlash2(false)
    }
    if (slash3) {
      setSlash3(false)
    }
    if (slash4) {
      setSlash4(false)
    }
    setHidden(false)

  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (refDiv) {
        if (refDiv.current !== null) {
          if (refDiv.current.contains(e.target)) {
          } else {
            setPendingDepo(false)
            setPendingWith(false)
          }
        }
      }
    }, true)
  }, [])


  useEffect(() => {


  }, [])
  return (

    <div className="mt-20 w-full  pb-10 relative ">
      {!hidden && <div className="w-fit ml-auto md:mr-10 mr-3 relative "> <button onClick={handleAllClicksFalse} className='underline'>Hide Balances</button></div>}
      {hidden && <div className="w-fit ml-auto md:mr-10 mr-3"> <button onClick={handleAllClicksTrue} className='underline'>Reveal Balances</button></div>}

      <div className="md:flex w-full gap-2 mx-2  justify-center  py-3 md:px-5">
        <div className="md:w-[40%] h-40 w-[80%] mx-auto md:h-48 rounded-md shadow-lg px-3">
          <div className="flex items-center  justify-between md:w-11/12 mx-auto mt-2">
            <SlWallet className='md:text-5xl text-black text-3xl' />
            <img onClick={() => setactive('deposit')} src={plus} className="bg-white rounded-full w-10 cursor-pointer" alt="" />
          </div>
          <div className="w-11/12 mx-auto rounded-sm  mt-4">
            <div className="w-11/12 mx-auto  mt-3 ">
              <div className="flex items-center justify-between w-4/4 mx-auto">
                <h1 className='md:text-2xl text-[#430a5d] font-bold '>Available Balance:</h1>

              </div>
              <div className="flex items-center gap-5 mt-5 justify-center">
                {loading && <Loading />}
                {slash === false && <h1 className={`text-center ${load ? 'md:text-xl' : 'text-sm text-slate-300'} text-blue-500 font-bold`}>{load ? formatter.format(balance.total) : 'network error'}</h1>}
                {slash === true && <h1 className='text-center md:text-3xl text-slate-500'>*** ***</h1>}
                {load && <Icon3 onClick={hideBalance} className={`md:text-xl cursor-pointer ${slash === true && 'text-xl'}`} />}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:w-[40%] w-[80%] h-40 mx-auto mt-5 md:mt-0 md:h-48 rounded-md shadow-lg px-3 ">
          <div className="flex items-center  justify-between md:w-11/12 mx-auto mt-2">
            <GiCash className='md:text-5xl text-3xl text-black' />
            <img onClick={() => setactive('deposit')} src={plus} className="bg-white rounded-full w-10 cursor-pointer" alt="" />
          </div>
          <div className="w-11/12 mx-auto rounded-sm  mt-4">
            <div className="w-11/12 mx-auto  mt-3 ">
              <div className="flex items-center justify-between w-4/4 mx-auto">
                <h1 className='md:text-2xl text-[#430a5d] font-bold '>Total Deposits:</h1>

              </div>
              <div className="flex items-center gap-5 mt-5 justify-center">
                {loading && <Loading />}
                {slash1 === false && <h1 className={`text-center ${load ? 'md:text-xl' : 'text-sm text-slate-300'} text-green-500 font-bold`}>{load ? formatter.format(balance.deposits) : 'network error'}</h1>}
                {slash1 === true && <h1 className='text-center md:text-3xl text-slate-500'>*** ***</h1>}
                {load && <Icon4 onClick={hideBalance1} className={`md:text-xl cursor-pointer ${slash1 === true && 'text-xl'}`} />}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:w-[40%] w-[80%] h-40 mt-5 md:mt-0 mx-auto md:h-48 rounded-md shadow-lg px-3 ">
          <div className="flex items-center  justify-between md:w-11/12 mx-auto mt-2">
            <GiWallet className='md:text-5xl text-3xl text-black' />
            <h1 onClick={() => setactive('withdraw')}  className="bg-black rounded-full w-8 h-8 text-white flex items-center text-3xl justify-center cursor-pointer">-</h1>
          </div>
          <div className="w-11/12 mx-auto rounded-sm  mt-4">
            <div className="w-11/12 mx-auto  mt-3 ">
              <div className="flex items-center justify-between w-4/4 mx-auto">
                <h1 className='md:text-2xl text-[#430a5d] font-bold '>Total Withdrawals:</h1>

              </div>
              <div className="flex items-center gap-5 mt-5 justify-center">
                {loading && <Loading />}
                {slash2 === false && <h1 className={`text-center ${load ? 'md:text-xl' : 'text-sm text-slate-300'} text-red-500 font-bold`}>{load ? formatter.format(balance.withdraws) : 'network error'}</h1>}
                {slash2 === true && <h1 className='text-center md:text-3xl text-slate-500'>*** ***</h1>}
                {load && <Icon5 onClick={hideBalance2} className={`md:text-xl cursor-pointer ${slash2 === true && 'text-xl'}`} />}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="md:flex w-full gap-2 mx-2  justify-center  py-3 md:px-5"> */}

      <div className="md:flex w-full gap-2 mx-2  justify-center  py-3 md:px-5">
        <div className=" md:w-[40%] w-[80%] h-40 mx-auto mt-5 md:mt-0 md:h-48 rounded-md shadow-lg px-3 ">
          <div className="flex items-center justify-between w-11/12 mx-auto mt-2">
            <FaRegMoneyBillAlt className='md:text-5xl text-3xl text-black' />
            <button onClick={() => setPendingDepo(prev => !prev)} className='px-3 py-1 bg-black text-white rounded-bl-full'>check</button>
          </div>
          <div className="w-11/12 mx-auto h-full  rounded-xl  mt-4">
            <div className="w-11/12 mx-auto  mt-3">
              <div className="flex items-center justify-between w-4/4 mx-auto">
                <h1 className='md:text-xl font-bold text-[#430a5d]'>Pending Deposits:</h1>
                <p className='font-bold'>({pendingDeposits.length})</p>
              </div>
              <div className="flex items-center gap-5 mt-5 justify-center">
                {loading && <Loading />}
                {slash3 === false && <h1 className={`text-center ${load ? 'md:text-xl' : 'text-sm text-slate-300'}  font-bold`}>{load ? formatter.format(pendingdepoBalance) : 'network error'}</h1>}
                {slash3 === true &&
                  <h1 className='text-center md:text-3xl text-slate-500'>*** ***</h1>}
                {load && <Icon7 onClick={hideBalance3} className={`text-sm cursor-pointer ${slash3 === true && 'text-lg'}`} />}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:w-[40%] w-[80%] h-40 mx-auto mt-5 md:mt-0 md:h-48 rounded-md shadow-lg px-3 ">
          <div className="flex items-center justify-between w-11/12 mx-auto mt-2">
            <BiMoneyWithdraw className='md:text-5xl text-3xl text-black' />
            <button onClick={() => setPendingWith(prev => !prev)} className='px-3 py-1 bg-black text-white rounded-bl-full'>check</button>
          </div>
          <div className="w-11/12 mx-auto h-full  rounded-xl  mt-4">
            <div className="w-11/12 mx-auto  mt-3">
              <div className="flex items-center justify-between w-4/4 mx-auto">
                <h1 className='md:text-xl font-bold text-[#430a5d]'>Pending Withdrawals:</h1>
                <p className='font-bold'>({pendingWithdrawals.length})</p>
              </div>
              <div className="flex items-center gap-5 mt-5 justify-center">
                {loading && <Loading />}
                {slash4 === false && <h1 className={`text-center ${load ? 'md:text-xl' : 'text-sm text-slate-300'}  font-bold`}>{load ? formatter.format(pendingwithBalance) : 'network error'}</h1>}
                {slash4 === true &&
                  <h1 className='text-center md:text-3xl text-slate-500'>*** ***</h1>}
                {load && <Icon7 onClick={hideBalance4} className={`text-sm cursor-pointer ${slash4 === true && 'text-lg'}`} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {pendingdepo && <>
        <div ref={refDiv} className={` ${pendingDeposits.length === 1 ? 'h-fit':'h-72'} fixed top-[20%] left-10  overflow-y-auto scroll2 rounded-md md:left-[26%] md:w-[70%] bg-white border-2 `}>
          <h1 className='text-center text-back mt-2 font-bold md:text-2xl'>
            {pendingDeposits.length === 1 ? pendingDeposits.length === 0 ? 'Pending Deposit' : 'No Pending Deposits' : 'Pending Deposits'}</h1>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table class="w-full text-[12px] md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                <tr>
                <th scope="col" class="md:px-6 px-2 py-3 w-10">
                  Type
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 ">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 md:w-[35%] hidden md:block">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

                </tr>
              </thead>
              <tbody>
                {pendingDeposits.map((item) => (
                  <tr class="bg-white z-50 border-b " key={item.id}>
                    <th scope="row" class={`${item.type === 'deposit' ? 'text-black' : ''} capitalize ${item.type === 'deposit' ? 'text-green-500 font-bold ' : 'text-red-500 font-bold '} capitalize px-6 py-4 font-medium  whitespace-nowrap `}>
                      {item.type}
                    </th>
                    <td class="md:px-6 px-2 py-4 text-center">
                    {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td class="md:px-6 px-2 md:py-4">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="md:px-6 md:py-4 md:w-[45%] w-[10%] hidden md:block text-left">
                    {item.message}
                  </td>
                  <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''} px-2  rounded-md mx-auto`}>
                    {item.status}
                  </td>

                  </tr>
                ))}


              </tbody>
            </table>
          </div>
          <p className='flex items-center justify-center gap-1 text-black text-sm'><span className='font-bold text-xl'>*</span> expect your balance to increase once your deposit is completed</p>
        </div>
      </>}
      {pendingwith && <>
        <div ref={refDiv} className={` ${pendingDeposits.length === 1 ? 'h-fit':'h-72'} fixed top-[20%] left-10  overflow-y-auto scroll2 rounded-md md:left-[26%] md:w-[70%] bg-white border-2 `}>
          <h1 className='text-center text-back mt-2 font-bold md:text-2xl'>
            {pendingWithdrawals.length === 1 ? 'Pending Withdrawal' : 'No Withdrawal Pending '}</h1>
          <div class="relative scroll2 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-[12px] md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                <tr>
                <th scope="col" class="md:px-6 px-2 py-3 w-10">
                  Type
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 ">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 hidden md:block w-[35%]">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((item) => (
                  <tr class="bg-white border-b " key={item.id}>
                    <th scope="row" class={` capitalize ${item.type === 'deposit' ? 'text-green-500 font-bold ' : 'text-red-500 font-bold '} capitalize md:px-6 md:py-4 font-medium  whitespace-nowrap `}>
                      {item.type}
                    </th>
                    <td class="md:px-6 px-2 py-4 text-center">
                    {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td class="md:px-6 px-2 md:py-4">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="md:px-6 md:py-4 md:w-[45%] w-[10%]  text-left hidden md:block">
                    {item.message}
                  </td>
                  <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''} px-2  rounded-md mx-auto`}>
                    {item.status}
                  </td>

                  </tr>
                ))}


              </tbody>
            </table>
          </div>
          <p className='flex items-center justify-center gap-1 text-black text-sm'><span className='font-bold text-xl'>*</span>expect your balance to decrease once your withdrawal is completed</p>
        </div>
      </>}

      <div className="mt-5 w-[95%] mx-auto">
        <h1 className='text-2xl   font-bold'>Latest Transactions</h1>

        <div class="shadow-md sm:rounded-lg mt-4">
          <table class=" w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
              <tr>
              <th scope="col" class="md:px-6 px-2 py-3 w-10">
                  Type
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 px-2 py-3  hidden md:block">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {alltrnx.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((item) => (
                <tr class="bg-white border-b md:text-sm dark:bg-white " key={item.id}>
                  <th scope="row" class={`${item.type === 'withdrawal' ? 'text-red-500' : item.type === 'deposit' ? 'text-green-500' : item.type !== 'withdrawal' || item.type !== 'deposit' ? 'text-teal-600' : ''} capitalize px-6 py-4 font-medium  whitespace-nowrap w-2  `}>
                    {item.type}
                  </th>
                  <td class=" text-center ">
                    {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td class="md:px-6 px-2 md:py-4">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="md:px-6 md:py-4  hidden md:block  text-left">
                    {item.message}
                  </td>
                  <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''} px-2  rounded-md mx-auto`}>
                    {item.status}
                  </td>

                </tr>
              ))}


            </tbody>
          </table>
        </div>

        {!load && <>
          <div className="flex items-baseline justify-center relative w-full">
            <div className="  md:text-xl text-black mt-5">Loading Transaction Data </div>
            <Loader className=" mr-auto" height={`10`} width={`10`} />
          </div>
        </>}
      </div>
      <Link onClick={() => setactive('transaction')} className='flex items-center justify-center w-2/4 mx-auto rounded-full text-[white] mt-5 font-bold px-3 py-1 mb-3 bg-[#430a5d]'>view more transactions</Link>
    </div>
    // </AdminPageLayout>
  )
}

export default Home