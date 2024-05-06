import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { Apis, GetApi, PostApi } from '../../services/Apis'
import { errorMessage, successMessage } from '../../components/utils/UtilNames'
import { IoMdNotificationsOutline } from 'react-icons/io'
import moment from 'moment'
// import Notify from '../../components/Notify'




const Notifications = ({ settrigger }) => {
    const [notifications, setNotifications] = useState([])
    const [opened, setopened] = useState(false);
    const [loading, setLoading] = useState(false)
    const [triggerFetch, setTriggerFetch] = useState(false);

    const fetchNotifications = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.auth.notify)
            if (response.status === 200) {
                setNotifications(response.data)
                settrigger(prev => !prev)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const Markread = useCallback(async () => {
        setLoading(true)
        try {
            const response = await PostApi(Apis.auth.mark_as_read)
            if (response.status === 200) {
                settrigger(prev => !prev)
                await fetchNotifications()

            }else{
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
            setTriggerFetch(prev => !prev)
        } finally {
            setLoading(false)
        }
    }, [])


    const markAsRead = useCallback(async (item) => {
        setLoading(true)
        const id = item.id
        try {
            const response = await PostApi(Apis.auth.notice + "/" + id)
            if (response.status === 200) {
                settrigger(prev => !prev)
                await fetchNotifications()
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [fetchNotifications, setLoading])
    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications, setLoading])

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
   
    const records = notifications.slice(firstIndex, lastIndex)
    const npage = Math.ceil(notifications.length / recordsPerPage)
  
    if(records.length === 0){
        firstIndex = 0
      }
       if(firstIndex === 0){
        firstIndex = 1
      }
    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
   
    
    const changeCurrentPage = (id,e) =>{
        e.preventDefault()
        setCurrentPage(id)
      }
    return (
        <div className={`mt-16 w-full  pb-10 relative z-0  `}>
            <div className="w-11/12 mx-auto pt-10">
                {loading && <Loading />}
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-bold'>Latest Notifications</h1>
                    <button onClick={Markread} className='text-sm font-bold px-3 py-1 mainbg text-white rounded-md'>mark all as read</button>
                </div>
                {records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10).map((item, i) => (
                    <div className={`${item.status === 'unread' ?'bg-[#dedfe1]' :'bg-white'} mt-3 rounded-md py-3 flex flex-col border-b `} key={i} >
                        <div className="w- ml-2 flex items-center gap-2 ">
                            <div className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center relative">
                                <IoMdNotificationsOutline className='text-xl bg-[#f8fafc]' />
                                {item.status === 'unread' && <div className="w-2 h-2 bg-red-500 absolute rounded-full right-2 top-2"></div>}
                            </div>
                            <div className="flex md:items-center w-full pr-3 justify-between ">
                                <div className="md:px-4 py-1  rounded-md font-bold text-sm md:text-lg capitalize">{item.type}</div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="px-4 py-1 bg-[#f8fafc] text-sm md:text-md rounded-md">{moment(item.createdAt).format('DD-MM-YYYY  hh:mm A')}
                                    </div>
                                    {item.status === 'read' ? <p className='text-slate-300'>opened</p> : <button onClick={() => markAsRead(item)} className='text-slate-600 cursor-pointer'>mark as read</button>}
                                </div>
                            </div>
                        </div>
                        <div className="w-11/12 text-sm md:text-md mx-auto">{item.message}</div>
                    </div>

                ))}

            </div>

            {records.length > 0 &&<div className="w-fit ml-auto mr-5 mt-5">
                <div class="flex flex-col items-center">
                    <span class="text-sm text-gray-700 ">
                        Showing <span class="font-semibold text-gray-900 ">{firstIndex}</span> to
                        <span class="font-semibold text-gray-900 "> {lastIndex > notifications.length ? notifications.length : lastIndex}</span> of
                        <span class="font-semibold text-gray-900 "> {notifications.length} </span>
                        Notifications
                    </span>

                    <div class="w-1/2 flex items-center gap-4 mt-2 xs:mt-0">
                        <button onClick={prevPage} class="flex items-center justify-center px-4 h-8 text-base font-medium text-white
                     bg-[#582a6d] rounded-s hover:bg-[#430a5d] 
                        ">
                            Prev
                        </button>
                        <button onClick={nextPage} class="flex items-center justify-center px-4 h-8 text-base font-medium
                     text-white bg-[#582a6d]  hover:bg-[#430a5d] rounded-e 
                        ">
                            Next
                        </button>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Notifications