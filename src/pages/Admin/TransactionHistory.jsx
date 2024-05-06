import React, { useCallback, useEffect, useState } from 'react'
import AdminPageLayout from './AdminPageLayout'
import Loading from '../../components/Loading'
import { errorMessage, formatter } from '../../components/utils/UtilNames'
import { Apis, GetApi } from '../../services/Apis'
import moment from 'moment'

const TransactionHistory = () => {
  const [alltransactions, setAlltransactions] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchAllTransactions = useCallback(async () => {
    setLoading(true)
    try {
      const response = await GetApi(Apis.auth.all_trnx)
      if (response.status === 200) {
        setAlltransactions(response.data)
      }
    } catch (error) {
      return errorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchAllTransactions()
   console.log(alltransactions)
  }, [])

  const plan = 'plan purchase'
  const deposit = 'deposit'
  const withdrawal = 'withdrawal'
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = alltransactions.slice(firstIndex, lastIndex)
  const npage = Math.ceil(alltransactions.length / recordsPerPage)
  const numbers = npage > 0 ? [...Array(npage).keys()].slice(1) : []

    if(records.length === 0){
      firstIndex = 0
    }
     if(firstIndex === 0){
      firstIndex = 1
    }
  

  const check = () => {
    console.log(recordsPerPage)
    console.log(npage)
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

  const changeCurrentPage = (id, e) => {
    e.preventDefault()
    setCurrentPage(id)
  }
  
  return (
    <div className="mt-16 w-full px-2 mx-auto ">
      {loading && <Loading />}
      <div className="mt-5 mb-5">
        <div className="flex items-center">
          <h1 className='text-2xl mt-5  font-bold'>Transactions History</h1>

        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full ">
          <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
            <thead class="md:text-xs text-center text-white uppercase bg-gray-50 mainbg ">
              <tr>
                <th scope="col" class="md:px-6 px-2 py-3 w-10">
                  Type
                </th>
                <th scope="col" class="md:px-6 px-2 py-3  ">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 py-3 hidden md:block ">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,recordsPerPage).map((item) => (
                <tr class="bg-white border-b " key={item.id}>
                 <th scope="row" class={`${item.type === 'withdrawal'? 'text-red-500' :item.type === 'deposit' ?'text-green-500':item.type !== 'deposit' && item.type !== 'withdrawal' ?'text-teal-500':''} capitalize md:px-6 md:py-4 px-6 py-4 font-medium  whitespace-nowrap `}>
                    {item.type}
                  </th>
                  <td class=" w-[30%] text-center ">
                    {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td class=" text-center">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="px-6 py-4 hidden md:block">
                    {item.message}
                  </td>
                  <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''}  rounded-md mx-auto`}>
                    {item.status}
                  </td>

                </tr>
              ))}


            </tbody>
          </table>
        </div>
        <div className="w-fit ml-auto mr-5 mt-5">
          <div class="w-full flex flex-col items-center ">
            <span class="text-sm text-gray-700 ">
              Showing <span class="font-semibold text-black">{firstIndex}</span> to
              <span class="font-semibold text-black"> {lastIndex > alltransactions.length ? alltransactions.length : lastIndex}</span> of
              <span class="font-semibold text-black"> {alltransactions.length} </span>
              Transactions
            </span>

            <div class=" flex items-center gap-4 mt-2 xs:mt-0">
              <button onClick={prevPage} class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#582a6d] rounded-s hover:bg-[#430a5d]
                      ">
                Prev
              </button>

              {numbers.map((n, i) => (
                <div className={``} key={i}>
                   <a onClick={(e) => changeCurrentPage(n, e)} href="#" className={`flex items-center justify-center
                    px-3 h-8 leading-tight   border border-gray-300
                      ${currentPage === n ? 'bg-gray-500 text-white':'bg-white hover:bg-gray-100'}`}>{n}</a>
                </div>
              ))}
              <button onClick={nextPage} class="flex items-center justify-center px-4 h-10 text-base font-medium
                     text-white bg-[#582a6d] rounded-s hover:bg-[#430a5d] rounded-e   ">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TransactionHistory