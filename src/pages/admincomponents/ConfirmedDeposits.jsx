import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { errorMessage, formatter } from '../../components/utils/UtilNames'
import { Apis, GetApi } from '../../services/Apis'
import moment from 'moment'

const ConfirmedDeposits = () => {

    const [deposits, setDeposits] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchConfirmedDeposits = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.admins.confirmed_deposits)
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
        fetchConfirmedDeposits()
    }, [])
    return (
        <div className='w-full h-full py-4 mt-10 md:mt-0 mb-10 md:mb-0'>
            <div className="w-11/12 mx-auto mt-5 relative">
                <h1 className='text-xl text-center font-bold main'>Confirmed Deposits</h1>
                {loading && <Loading />}
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full ">
                    <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
                        <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                            <tr>
                                <th scope="col" class="md:px-6 px-2 py-3">
                                    Type
                                </th>
                                <th scope="col" class="md:px-6 px-2 py-3 ">
                                    Date Initiated
                                </th>
                                <th scope="col" class="md:px-6 px-2 py-3 ">
                                    Date Updated
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
                                    <td class="md:px-6 md:py-4 text-center px-3">
                                        {moment(item.updatedAt).format('DD MMMM YYYY hh:mm A')}
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


                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ConfirmedDeposits