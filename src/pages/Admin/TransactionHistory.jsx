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
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  if (firstIndex === 0) {
    firstIndex = 1
  }
  const records = alltransactions.slice(firstIndex, lastIndex)
  const npage = Math.ceil(alltransactions.length / recordsPerPage)
  const numbers = npage > 0 ? [...Array(npage).keys()].slice(1) : []

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
                <th scope="col" class="md:px-6 px-2 py-3 ">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-[35%]">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {records.map((item) => (
                <tr class="bg-white border-b " key={item.id}>
                 <th scope="row" class={`${item.type === 'withdrawal'? 'text-red-500' :item.type === 'deposit' ?'text-green-500':item.type !== 'deposit' && item.type !== 'withdrawal' ?'text-teal-500':''} capitalize md:px-6 md:py-4 px-2 py-2 font-medium  whitespace-nowrap `}>
                    {item.type}
                  </th>
                  <td class="md:px-6 md:py-4 text-center px-3">
                    {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td class="md:px-6 px-2 md:py-4 text-center">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="md:px-6 md:py-4 md:w-[45%] w-[10%] text-left">
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
                  <a onClick={(e) => changeCurrentPage(n, e)} href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ">{n}</a>
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