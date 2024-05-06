import React, { useCallback, useEffect, useRef, useState } from 'react'
import { errorMessage, formatter, successMessage } from '../../components/utils/UtilNames'
import moment from 'moment'
import Loading from '../../components/Loading'
import { Apis, GetApi, PostApi } from '../../services/Apis'
import { FaRegCopy } from 'react-icons/fa'
import image from '../../assets/docs.png'

const PendingWithdrawals = ({ setActive }) => {
    const [loading, setLoading] = useState(false)
    const [withdraws, setWithdraws] = useState([])
    const [trigger, settrigger] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [confirm, setConfirm] = useState(false)
    const [decline, setDecline] = useState(false)
    const [txid, setTxid] = useState({
        txid: ''
    })

    const reftrigger = useRef(null)
    const refdecline = useRef(null)
    const refconfirm = useRef(null)

    const fetchPendingWithdrawals = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.admins.pending_withdraws)
            if (response.status === 200) {
                setWithdraws(response.data)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPendingWithdrawals()
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
        setSelectedItem(selectedItem => {
            const selected = withdraws.filter((item) => item.id === id)
            selectedItem = selected
            return selectedItem
        })
    }

    const handleChange = (e) => {
        setTxid({ ...txid, [e.target.name]: e.target.value })
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(selectedItem[0].address)
            .then(() => {
                successMessage('Transaction address copied to clipboard')
            })
            .catch(err => {
                errorMessage(err.message)
            });
    };

    const confirmPaid = async () => {
        const formdata = {
            id: selectedItem[0].id,
            txid: txid.txid
        }
        // return console.log(formdata)
        setLoading(true)
        try {
            const response = await PostApi(Apis.admins.approve_withdraw, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setConfirm(false)
                settrigger(false)
                setActive('con-with')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const DeclineWithdrawal = async () => {
        const formdata = {
            id: selectedItem[0].id,
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.admins.decline_withdraw, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setDecline(false)
                settrigger(false)
                setActive('home')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='w-full py-4 mt-10 md:mt-0 mb-10 md:mb-0'>
            <div className="w-11/12 mx-auto mt-5 relative">
                {withdraws.length > 0 ?
                    <>
                        <h1 className='text-xl text-center font-bold main'>Pending Withdrawals</h1>
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
                                    {withdraws.map((item) => (
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
                                                {item.userwithdrawals.username}
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
                    </> : <>
                        <div className="w-full h-full flex items-center justify-center flex-col gap-10">
                            <img src={image} className='w-48 animate-pulse' alt="" />
                            <h1 className='md:text-2xl font-bold'>Empty Data</h1>
                        </div>
                    </>
                }

                {trigger && <div ref={reftrigger} className='absolute top-1/2 flex h-fit py-10 items-center justify-center w-full'>
                    <div className="bg-white w-11/12 md:w-3/4 py-4 border rounded-md mx-auto h-full gap-5  flex items-center justify-center flex-col  ">
                        <div className="mt-3 text-center">
                            <hi className="text-xl font-bold ">Review Withdrawal Request</hi>
                        </div>
                        <div className=" w-3/4 md:flex flex-col ">
                            <h1>Payment Summary:</h1>
                            <p className='font-bold text-sm'>amount: ${selectedItem[0].amount}</p>
                            <div className="flex w-full items-center gap-3">
                                <p className='text-sm font-bold items-center flex gap-3'>Address: {selectedItem[0].address}</p>
                                <button onClick={copyToClipboard}><FaRegCopy className='text-lg cursor-pointer' /></button>
                            </div>

                            <div className="flex items-center justify-center w-full mt-5 flex-col">
                                <h1>Input Txhash of the Transaction</h1>
                                <input name='txid' value={txid.txid} type="text" className="w-full text-xs rounded-md border outline-none h-10 pl-2" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto flex items-center justify-between">
                            <button onClick={() => { setDecline(true) }} className='px-4 py-1 text-white bg-red-500 rounded-xl'>decline</button>
                            <button onClick={() => { setConfirm(true) }} className='px-4 py-1 text-white bg-green-500 rounded-xl'>paid</button>
                        </div>
                    </div>
                </div>}
                {decline &&
                    <div ref={refdecline} className='absolute top-1/2 flex h-20 items-center justify-center w-full'>
                        <div className="bg-white border md:w-1/4 px-6 rounded-md mx-auto h-full flex items-center justify-center flex-col  ">
                            <button onClick={DeclineWithdrawal} className='px-4 py-1 text-white bg-red-500 rounded-xl'>Confirm Decline</button>
                        </div>
                    </div>}
                {confirm &&
                    <div ref={refconfirm} className='absolute top-1/2 flex h-20 items-center justify-center w-full'>
                        <div className="bg-white border px-6 md:w-1/4 rounded-md mx-auto h-full gap-10 flex items-center justify-center flex-col  ">
                            <button onClick={confirmPaid} className='px-4 py-1 text-white bg-green-500 rounded-xl'>Confirm Paid</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default PendingWithdrawals