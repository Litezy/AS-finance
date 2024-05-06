import React, { useCallback, useEffect, useState } from 'react'
import { errorMessage } from '../../components/utils/UtilNames'
import { Apis, GetApi } from '../../services/Apis'
import moment from 'moment'
import KycModal from './KycModal'

const SubmittedKYCS = ({ setActive }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectItems, setSelectedItems] = useState({})
    const [trigger, settrigger] = useState(false)


    const fetchKYCs = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.admins.pending_kycs)
            console.log(response)
            if (response.status === 200) {
                setUsers(response.data)
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchKYCs()
    }, [])

    const SelectedItem = (id) => {
        setSelectedItems(selectItems => {
            selectItems = users.filter((item) => item.id === id)
            return selectItems
        })
    }
   
    return (
        <div className='w-full py-4 mt-10 md:mt-0 mb-10 md:mb-0'>
            <div className="w-11/12 mx-auto mt-5 relative">
                {users.length > 0 ?<>
                    <div className="text-center font-bold underline md:text-xl ">Users with KYC Submission</div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full ">
                        <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
                            <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                                <tr>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        Date Submitted
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        username
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        user id
                                    </th>
                                    <th scope="col" class="md:px-6 px-2 py-3 ">
                                        details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item) => (
                                    <tr class={`bg-white border-b  `} key={item.id}>
                                        <td class="md:px-6 md:py-4 text-center px-3">
                                            {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                                        </td>
                                        <td class="md:px-6 md:py-4 text-center px-3 capitalize">
                                            {item.userkyc.username}
                                        </td>
                                        <td class="md:px-6 px-2 md:py-4 text-center">
                                            {item.userid}
                                        </td>
                                        <td class=" px-2 md:py-4 text-center">
                                            <button onMouseOver={() => SelectedItem(item.id)} onClick={() => { settrigger(prev => !prev) }} className='px-4 bg-gray-200 py-2 rounded-xl font-bold'>view details</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>:<>
                 <div className="">No KYCS submitted</div>
                </>
                }

                {trigger && <div className='py-20 overflow-y-auto'>
                    <KycModal selected={selectItems} trigger={settrigger} active={setActive} />
                </div>}
            </div>
        </div>
    )
}

export default SubmittedKYCS