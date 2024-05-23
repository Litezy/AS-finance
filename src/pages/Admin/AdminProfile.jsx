import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminPageLayout from './AdminPageLayout'
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { errorMessage, successMessage } from '../../components/utils/UtilNames';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Apis, ClientPostApi, GetApi, PostApi, profileImg } from '../../services/Apis';
import Loading from '../../components/Loading';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

const AdminProfile = () => {
  const [loading, setLoading] = useState(false)
  
  const { isError, data, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await GetApi(auth_urls.profile)
      return response.data
    }
  })

  if (isLoading) return <div className='text-center'>Loading...</div>
  if (isError) return errorMessage(isError.message)

  return (

    <div className="w-11/12 mx-auto md:h-96 pb-3 mt-[4.5rem] relative ">
      {loading && <Loading />}
      <div className="text-center -mb-3 text-xl main font-bold pt-4">My Account</div>
      <div className="md:flex items-center flex-col w-full gap-6 mt-10 border px-3 py-4 rounded-lg shadow-lg mb-3">
        <div className="md:flex items-center justify-between w-full ">
          <div className="md:h-60 w-full h-1/2 items-center justify-center relative md:w-1/3">
           {data?.image ? <img src={`${profileImg}/profiles/${data?.image}`} className='w-60 h-60 mx-auto mb-5 md:mb-0 rounded-full object-cover' alt="" /> : 
           <div className="w-full h-full flex items-center justify-center">
            <FaRegUser className='w-full h-full'/>
           </div>
           }
            {/* {data?.kyc_status === 'verified' && <div className="absolute top-0 right-10"><BsFillPatchCheckFill className='text-2xl text-blue-500' />
            </div>} */}
          </div>
          <div className="md:w-fit flex-col ml-auto flex items-left">
            <h1 className='text-2xl '>Account Informations</h1>
            <div className="flex flex-col">
              <div className="flex w-full gap-2 font-bold">
                <p>Date Created:</p>
                <p className='text-sm'>{moment(data.createdAt).format('DD-MMMM-YYYY hh:mm A ')}</p>
              </div>
              <div className="flex items-center w-full gap-2 font-bold ">
                <p>Email:</p>
                <p>{data.email_verified === 'false' ? 'Not verified' : 'Verified'}</p>
              </div>
              <div className="flex items-center w-full gap-2 font-bold ">
                <p>KYC Status:</p>
                {data?.kyc_status === 'verified' && <BsFillPatchCheckFill className='text-xl text-blue-500' />}
                {data?.kyc_status === 'submitted' && <div className="text-sm">Submitted, Awaiting Approval</div>}
                {data?.kyc_status === 'unverified' && data?.kyc_status !== 'verified' && <div className="text-sm">Not Submitted</div>}
              </div>
              <div className="flex items-center w-full gap-2 font-bold ">
                <p>Last Login:</p>
                <p className='text-sm'>{data.last_login}</p>
              </div>
              {data.email_verified === 'false' &&
                <button className="w-fit rounded-full mainbg px-4 py-1 text-white cursor-pointer ml-auto">verify email now</button>}
            </div>
          </div>
        </div>
        <div className="mt-5 h-fit w-full  border rounded-md text-sm bg-[white] py-5 px-4  shadow-lg">
          <form className="md:flex md:items-baseline gap-5 w-full md:h-40 justify-center">
            <div className="md:w-1/2">
              <div className="flex flex-col w-full  ">
                <h1>Full Name:</h1>
                <input type="text" value={data?.full_name} readOnly className='w-full capitalize outline-none border-b h-8' />
              </div>
              <div className="flex flex-col w-full mt-3  ">
                <h1>Username:</h1>
                <input type="text" value={data?.username} readOnly className='w-full capitalize  outline-none border-b h-8' />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col w-full mt-3 ">
                <h1>Phone Number:</h1>
                <input type="text" value={data?.phone} readOnly className='w-full   outline-none border-b h-8' />
              </div>
              <div className="flex flex-col w-full mt-3  ">
                <h1>Email:</h1>
                <input type="text" value={data?.email} readOnly className='w-full lowercase outline-none border-b h-8' />
              </div>
            </div>
          </form>
        </div>



      </div>
    </div>
  )
}

export default AdminProfile



{/* <div className="w-11/12 mx-auto mt-10">
        <h1 className='text-2xl font-bold main underline'>Account Informations</h1>
       <div className="flex items-center flex-col">
       <div className="flex items-center w-full gap-2 font-bold">
          <p>Date Created:</p>
          <p>{moment(profile.createdAt).format('DD MMMM YYYY hh:mm A')}</p>
        </div>
       <div className="flex items-center w-full gap-2 font-bold ">
          <p>Email Verified:</p>
          <p>{profile.email_verified  === 'false' ? 'Not verified':''}</p>
        </div>
       <div className="flex items-center w-full gap-2 font-bold ">
          <p>KYC:</p>
          <p>Not submitted</p>
        </div>
       </div>
      </div> */}