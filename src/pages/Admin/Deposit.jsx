import React, { useEffect, useState } from 'react'
import AdminPageLayout from './AdminPageLayout'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { FaRegCopy } from "react-icons/fa";
import { errorMessage, formatter, successMessage } from '../../components/utils/UtilNames';
import { Apis, GetApi, PostApi } from '../../services/Apis';
import moment from 'moment';

const Deposit = ({ setactive, setTrigger }) => {
  const [screen, setScreen] = useState(1)
  const [walletid, setWalletid] = useState(null)
  const [value, setValue] = useState(null)
  const [titles, setTitles] = useState(null)
  const [alldeposits, setAlldeposits] = useState([])
  const [loading, setLoading] = useState(false)
  const [deposit, setDeposit] = useState({
    amount: '',
    txid: ''
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        successMessage('Address copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleChange = (e) => {
    setDeposit({
      ...deposit,
      [e.target.name]: e.target.value
    })
  }

  const selectCrypto = (e) => {
    setWalletid(e.target.value)
    setValue(e.target.selectedOptions[0].id)
    setTitles(e.target.selectedOptions[0].title)
  }
  const validateAmount = () => {
    if (walletid === null || !walletid) return errorMessage('please select a crypto currency')
    if (!deposit.amount) return errorMessage('Please enter an amount')
    if (deposit.amount <= 0) return errorMessage('Please enter a positive number')
    setScreen(2)
  }

  const SubmitTransaction = async (e) => {
    e.preventDefault()
    if (!deposit.txid) return errorMessage('Please provide a trnx id')
    if (deposit.txid.length <= 8) return errorMessage('Please provide a valid trnx id')

    const formdata = {
      wallet: walletid,
      amount: deposit.amount,
      trnxid: deposit.txid
    }
    setLoading(true)
    try {
      const response = await PostApi(Apis.auth.deposit, formdata)
      if (response.status === 200) {
        successMessage('Transaction submitted successfully')
        setactive('home')
        setTrigger(prev => !prev)
      }
    } catch (error) {
      errorMessage(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchAllDeposits = async () => {
      setLoading(true)
      try {
        const response = await GetApi(Apis.auth.deposits)
        if (response.status === 200) {
          setAlldeposits(response.data)
        }
      } catch (error) {
        errorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllDeposits()
    console.log(alldeposits)
  }, [])
  return (
    <div className="mt-24 w-full py-4 h-screen">
      <div className="flex  rounded-md h-fit pb-4 items-start justify-start ">
        {screen === 1 && <>
          <div className="mt-5 ml-4 w-full">
            <div className=" bg-white py-5">
              <h1 className='text-2xl text-center font-bold'>Initate A Deposit</h1>
              <form className='w-11/12 mx-auto mt-4' >
                <h3 className='mb-5 main font-bold'>Select Crypto Currency</h3>
                <select id='selected' onChange={selectCrypto} className='w-full outline-none border-b-2'>
                  <option >--select--</option>
                  <option id='0x3B05d310402c17ecd9C8050dFf8034AF61c563F2btc' value="Bitcoin" title='BTC'>Bitcoin</option>
                  <option id='0x9381E721415E61eB86E3AD247AAcF36Cf69CeACFeth' value="Ethereum" title='ETH'>Ethereum</option>
                  <option id='0xcFC7269251A2f2DF3FA583E4ec1fF71262a6Ea63xrp' value="Ripple" title='XRP'>Ripple</option>
                  <option id='0xcFC7269251A2f2DF3FA583E4ec1fF71262a6Ea63doge' value="Tether" title='USDT'>USDT</option>
                </select>
                <h3 className='my-5 main font-bold'>Amount to deposit ($)</h3>
                <input type="number" name={'amount'} value={deposit.amount} min={0} onChange={handleChange} className='w-full outline-none border-b-2' />
                <div className="w-fit ml-auto">
                  <button type='button' onClick={validateAmount} className='mainbg text-white px-10 mt-3 py-2 rounded-md'>Next</button>
                </div>
              </form>

            </div>
            <div className="mt-5">
              <h1 className='font-bold text-xl'>Latest Deposits</h1>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class=" md:w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
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
                    {alldeposits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((item) => (
                      <tr class="bg-white border-b " key={item.id}>
                        <th scope="row" class={` capitalize ${item.type === 'deposit' ? 'text-green-500 font-bold ' : 'text-red-500 font-bold '} capitalize px-6 py-4 font-medium  whitespace-nowrap `}>
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

            </div>
          </div>

        </>}
        {screen === 2 && <>
          <div className="mt-5 ml-4 w-full relative">
            <div className="text-center">
              <h1 className='text-2xl font-bold '>Complete Your Deposit</h1>
              
              <p className='md:text-md text-sm md:text-center text-left ml-5 md:ml-0'>Scan the QR code below or copy and paste the official company's <span className='main'>{walletid}</span> wallet address</p>
            </div>
            <div className="flex gap-5 mt-4 flex-col items-center mx-auto w-full">
            <div className="  h-20 w-48">
              <h2 className='text-center underline font-bold'>Deposit Summary</h2>
              <div className="flex items-center justify-between">
                <h3>Currency:</h3>
                <h3>{walletid}</h3>
              </div>
              <div className="flex items-center justify-between">
                <h3>Amount:</h3>
                <h3>{deposit.amount}</h3>
              </div>
            </div>
              {value && <QRCode value={value} />}
              <p className='md:text-xl mt-3 text-black text-center'>{walletid} ({titles}) Address</p>
              <div className="w-2/4 mx-auto flex items-center border rounded-xl px-5 relative ">
                <input type="text" value={value} className='w-full text-[12px] md:text-lg  h-12 outline-none font-bold main ' />
                <FaRegCopy onClick={copyToClipboard} className='md:text-xl absolute main cursor-pointer right-0 ' />
              </div>
            </div>
          
            <div className="flex w-full items-center justify-between mt-5">
              <button onClick={() => setScreen(1)} className='px-5 py-1 mainbg text-white rounded-full'>change address</button>
              <button onClick={() => setScreen(3)} className='px-5 py-1 mainbg text-white rounded-full'>continue</button>
            </div>
          </div>
        </>}
        {screen === 3 && <>
          <div className="mt-5 ml-4 w-full h-screen flex items-center flex-col justify-center">
            <div className="text-center">
              <h1 className='text-2xl font-bold '>Submit Your ID</h1>
              <p>Kindly submit your deposit transaction ID for verification</p>
            </div>
            <div className="flex gap-5 mt-4 flex-col items-center mx-auto w-full">
              <p className='text-2xl mt-3 text-black text-center'>{walletid} ({titles}) </p>
            </div>
            <div className="w-3/6 mx-auto  flex flex-col  justify-center">
              <h2>Transaction ID:</h2>
              <input type="text" name='txid' placeholder='TXID*******' value={deposit.txid} className='w-full border  h-12 outline-none  pl-3 rounded-md ' onChange={handleChange} />
            </div>
            <div className="w-11/12 mx-auto justify-between mt-5 flex items-center">
              <button onClick={() => setScreen(2)} className='px-5 py-1 mainbg text-white rounded-full'>back</button>
              <button onClick={SubmitTransaction} className='px-5 py-1 mainbg text-white rounded-full'>Submit</button>
            </div>

          </div>
        </>}
      </div>
    </div>

  )
}

export default Deposit