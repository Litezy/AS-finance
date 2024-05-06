import React, { useCallback, useEffect, useRef, useState } from 'react'
import { errorMessage, formatter, successMessage } from '../../components/utils/UtilNames'
import { Apis, GetApi, PostApi } from '../../services/Apis'
import moment from 'moment'
import Loading from '../../components/Loading'
import { FaRegCopy } from "react-icons/fa";
import emptydataImg from '../../assets/emptydata.png'

const PendingDeposits = ({ setActive }) => {

    const [deposits, setDeposits] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedDeposit, setSelectedDeposit] = useState({})
    const [trigger, settrigger] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [decline, setDecline] = useState(false)

    const reftrigger = useRef(null)
    const refdecline = useRef(null)
    const refconfirm = useRef(null)
    const fetchPendingDeposits = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.admins.pending_deposits)
            // console.log(response.data)
            if (response.status === 200) {
                setDeposits(response.data)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchPendingDeposits()
    }, [])

    useEffect(() => {
        if (reftrigger) {
            window.addEventListener('click', (e) => {
                if (reftrigger.current !== null) {
                    if (reftrigger.current.contains(e.target)) {
                    } else {
                        settrigger(false)
                    }
                }
            }, true)
        }
    }, [])
    useEffect(() => {
        if (refdecline) {
            window.addEventListener('click', (e) => {
                if (refdecline.current !== null) {
                    if (refdecline.current.contains(e.target)) {
                    } else {
                        setDecline(false)
                    }
                }
            }, true)
        }
    }, [])
    useEffect(() => {
        if (refconfirm) {
            window.addEventListener('click', (e) => {
                if (refconfirm.current !== null) {
                    if (refconfirm.current.contains(e.target)) {
                    } else {
                        setConfirm(false)
                    }
                }
            }, true)
        }
    }, [])
    const SelectItem = (id) => {
        setSelectedDeposit(selectedDeposit => {
            const selected = deposits.filter((item) => item.id === id)
            selectedDeposit = selected
            return selectedDeposit
        })
    }

    const DeclineDeposit = async () => {
        const formdata = {
            id: selectedDeposit[0].id
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.admins.decline_deposit, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setDecline(false)
                setActive('home')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }
    const ApproveDeposit = async () => {
        const formdata = {
            id: selectedDeposit[0].id
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.admins.approve_deposit, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setConfirm(false)
                setActive('con-depo')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(selectedDeposit[0].trnxid)
            .then(() => {
                successMessage('Transaction address copied to clipboard')
            })
            .catch(err => {
                errorMessage(err.message)
            });
    };

    return (
        <div className='w-full py-4 mt-10 md:mt-0 mb-10 md:mb-0'>
            <div className="w-11/12 mx-auto mt-5 relative">
                {deposits.length > 0 ? <>
                    <h1 className='text-xl text-center font-bold main'>Pending Deposits</h1>
                    {loading && <Loading />}
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full ">
                        <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
                            <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                                <tr>
                                    <th scope="col" class="md:px-6 px-2 py-3">
                                        Type
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        Date
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        user
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {deposits.map((item) => (
                                    <tr class="bg-white border-b " key={item.id}>
                                        <th scope="row" class={`${item.type === 'withdrawal' ? 'text-red-500' : item.type === 'deposit' ? 'text-green-500' : item.type !== 'deposit' && item.type !== 'withdrawal' ? 'text-teal-500' : ''} capitalize md:px-6 md:py-4 px-2 py-2 font-medium  whitespace-nowrap `}>
                                            {item.type}
                                        </th>
                                        <td class="md:px-6 md:py-4 text-center px-3">
                                            {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                                        </td>
                                        <td class="md:px-6 px-2 md:py-4 text-center">
                                            {formatter.format(item.amount)}
                                        </td>
                                        <td class="md:px-6 md:py-4 text-center lowercase">
                                            {item.userdeposits.username}
                                        </td>
                                        <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''}  rounded-md mx-auto`}>
                                            {item.status}
                                        </td>
                                        <td class={` text-center `}>
                                            <button onClick={() => settrigger(prev => !prev)}
                                                onMouseOver={() => SelectItem(item.id)} className='px-3 py-1 mainbg text-white rounded-md'>Action</button>
                                        </td>

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </>: <>

                <div className="w-full h-full flex items-center justify-center flex-col gap-10">
                    <img src={emptydataImg} className='w-48 animate-pulse' alt="" />
                    <h1 className='md:text-2xl font-bold'>Empty Data</h1>
                </div>
                </>}
                {trigger && <div ref={reftrigger} className='absolute top-1/2 flex h-fit py-10 items-center justify-center w-full'>
                    <div className="bg-white w-11/12 md:w-2/4 py-4 border rounded-md mx-auto h-full gap-5  flex items-center justify-center flex-col  ">
                        <div className="mt-3 text-center">
                            <hi className="text-xl font-bold ">Review Deposit Request</hi>
                            <h1 className='text-lg font-bold '>
                                Take action on {`${selectedDeposit[0].userdeposits.username}'s $${selectedDeposit[0].amount} deposit`}</h1>
                        </div>
                        <div className="text-left  w-3/4 md:flex gap-5 flex-col">
                            <h3>Verify Transaction ID: </h3>
                            <div className="flex items-center gap-4 w-full ">
                                <input value={`${selectedDeposit[0].trnxid.slice(0,36)}...`} className='text-blue-500 border-b text-[12px] md:text-sm text-left  outline-none w-full ' readOnly />
                                <button onClick={copyToClipboard} className='text-xl'><FaRegCopy /></button>
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto flex items-center justify-between">
                            <button onClick={() => { setDecline(true)}} className='px-4 py-1 text-white bg-red-500 rounded-xl'>decline</button>
                            <button onClick={() => { setConfirm(true)}} className='px-4 py-1 text-white bg-green-500 rounded-xl'>approve</button>
                        </div>
                    </div>
                </div>}
                {decline &&
                    <div ref={refdecline} className='absolute top-1/2 flex h-20 items-center justify-center w-full'>
                        <div className="bg-white px-6 border md:w-1/4 rounded-md mx-auto h-full flex items-center justify-center flex-col  ">
                            <button onClick={DeclineDeposit} className='px-4 py-1 text-white bg-red-500 rounded-xl'>Confirm Decline</button>
                        </div>
                    </div>}
                {confirm &&
                    <div ref={refconfirm} className='absolute top-1/2 flex h-20 items-center justify-center w-full'>
                        <div className="bg-white border px-6 md:w-1/4 rounded-md mx-auto h-full gap-10 flex items-center justify-center flex-col  ">
                            <button onClick={ApproveDeposit} className='px-4 py-1 text-white bg-green-500 rounded-xl'>Confirm Approval</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default PendingDeposits