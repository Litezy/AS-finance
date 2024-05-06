import React, { useEffect, useRef, useState } from 'react'
import { Apis, PostApi, profileImg } from '../../services/Apis'
import Loading from '../../components/Loading'
import { errorMessage, successMessage } from '../../components/utils/UtilNames'

const KycModal = ({ selected, trigger,active }) => {
  const refdiv = useRef(null)
  const approveref = useRef(null)
  const declineref = useRef(null)
  const [loading,setLoading] = useState(false)

  const [approve, setApprove] = useState(false)
  const [decline, setDecline] = useState(false)

  useEffect(() => {
    if (refdiv) {
      window.addEventListener('click', (e) => {
        if (refdiv.current !== null) {
          if (refdiv.current.contains(e.target)) {
          } else {
            trigger(false)
          }
        }
      }, true)
    }
  }, [])
  useEffect(() => {
    if (declineref) {
      window.addEventListener('click', (e) => {
        if (declineref.current !== null) {
          if (declineref.current.contains(e.target)) {
          } else {
            setDecline(false)
          }
        }
      }, true)
    }
  }, [])
  useEffect(() => {
    if (approveref) {
      window.addEventListener('click', (e) => {
        if (approveref.current !== null) {
          if (approveref.current.contains(e.target)) {
          } else {
            setApprove(false)
          }
        }
      }, true)
    }
  }, [])

const DeclineKyc = async () =>{
  const formdata = {
    id: selected[0].id
  }
  setLoading(true)
  try {
    const response = await PostApi(Apis.admins.decline_kyc,formdata)
    if(response.status === 200){
      successMessage(response.msg)
      setDecline(false)
      trigger(false)
      active('home')
    }else{
      errorMessage(response.msg)
    }
  } catch (error) {
    errorMessage(error.message)
  }finally{
    setLoading(false)
  }
}
const ApproveKyc = async () =>{
  const formdata = {
    id: selected[0].id
  }
  setLoading(true)
  try {
    const response = await PostApi(Apis.admins.approve_kyc,formdata)
    if(response.status === 200){
      successMessage(response.msg)
      setApprove(false)
      trigger(false)
      active('home')
    }else{
      errorMessage(response.msg)
    }
  } catch (error) {
    errorMessage(error.message)
  }finally{
    setLoading(false)
  }
}
  return (
    <div ref={refdiv} className={`  w-full mx-auto pb-10 md:pb-0 md:bottom-10 top-20 absolute h-fit bg-white rounded-md border shadow-xl `}>
      <h1 className='text-center py-4 font-bold capitalize'>KYC Submission from {selected[0].firstname}</h1>
      {loading && <Loading/>}
      <div className="flex w-11/12 mx-auto items-baseline">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="">
            <h1 className='text-sm'>First Name:</h1>
            <h1 className='font-bold text-md'>{selected[0].firstname}</h1>
          </div>
          <div className=" text-md">
            <h1 className='text-sm'>Last Name:</h1>
            <h1 className='font-bold '>{selected[0].lastname}</h1>
          </div>
          <div className=" text-md">
            <h1 className='text-sm'>Gender:</h1>
            <h1 className='font-bold '>{selected[0].gender}</h1>
          </div>
          <div className=" text-md">
            <h1 className='text-sm'>Marital Status:</h1>
            <h1 className='font-bold '>{selected[0].marital}</h1>
          </div>
          <div className="text-md">
            <h1 className='text-sm'>Date Of Birth:</h1>
            <h1 className='font-bold '>{selected[0].dob}</h1>
          </div>

        </div>
        <div className="">
          <div className="text-md">
            <h1 className='text-sm'>Address Line:</h1>
            <h1 className='font-bold '>{selected[0].address}</h1>
          </div>
          <div className="text-md">
            <h1 className='text-sm'>Zip Code:</h1>
            <h1 className='font-bold '>{selected[0].zip}</h1>
          </div>
          <div className="text-md">
            <h1 className='text-sm'>City:</h1>
            <h1 className='font-bold '>{selected[0].city}</h1>
          </div>
          <div className="text-md">
            <h1 className='text-sm'>Country:</h1>
            <h1 className='font-bold '>{selected[0].country}</h1>
          </div>
          <div className="">
            <h1>ID Card Type</h1>
            <h1 className='font-bold '>{selected[0].id_type}</h1>
          </div>
          <div className="">
            <h1>ID Card No</h1>
            <h1 className='font-bold '>{selected[0].id_number}</h1>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-6 h-full flex  gap-4">
        <div className="w-1/2">
          <h1>ID Front Photo</h1>
          <img src={`${profileImg}/kycs/${selected[0].firstname} ${selected[0].lastname}'s kyc/${selected[0].frontimg}`} className='w-full md:h-96 object-contain' alt="" />
        </div>
        <div className="w-1/2">
          <h1>ID Back Photo</h1>
          <img src={`${profileImg}/kycs/${selected[0].firstname} ${selected[0].lastname}'s kyc/${selected[0].backimg}`} className='w-full md:h-96 object-contain' alt="" />
        </div>
      </div>
      <div className="w-11/12 mt-10 mb-5 mx-auto flex items-center justify-between">
        <button onClick={() => setDecline(prev => !prev)} className='px-4 py-2 bg-red-500 text-white rounded-md'>Decline Kyc</button>
        <button onClick={() => setApprove(prev => !prev)} className='px-4 py-2 bg-green-500 text-white rounded-md'>Approve Kyc</button>
      </div>
      {decline && <>
       <div ref={declineref} className="fixed  top-1/2 right-[25%] px-6 md:w-1/4 h-20 flex items-center justify-center bg-white shadow-xl">
        <button onClick={DeclineKyc}  className='px-4 py-2 bg-red-500 text-white rounded-md'>Confirm Decline</button>
       </div>
      </>}
      {approve && <>
       <div ref={approveref} className="fixed  top-1/2 right-[25%] px-6 md:w-1/4 h-20 flex items-center justify-center bg-white shadow-xl">
        <button onClick={ApproveKyc} className='px-4 py-2 bg-green-500 text-white rounded-md'>Confirm Approval</button>
       </div>
      </>}
    </div>
  )
}

export default KycModal