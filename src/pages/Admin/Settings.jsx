import React, { useState } from 'react'
import AdminPageLayout from './AdminPageLayout'
import kycimg from '../../assets/kycimg.png'
import passwordimg from '../../assets/passwordimg.png'
import profileimg from '../../assets/profileimg.png'
import Kyc from '../../components/Kyc'
import ChangePassword from '../../components/ChangePassword'
import EditProfile from '../../components/EditProfile'
import emailImg from '../../assets/emailimg.png'
import ChangeEmail from '../../components/ChangeEmail'


const Settings = ({ setActive, data, setSetsName, setSets }) => {

  const [screen, setScreen] = useState(1)
  return (

    <div className='py-5  md:h-screen '>
      {screen === 1 &&
        <>
          <div className="px-4 mt-24 md:px-0 w-11/12 mx-auto md:grid grid-cols-2 gap-2 ">
            <div onClick={() => { setScreen(2), setSets(true), setSetsName('Kyc') }} className="bg-white h-48 w-full mx-auto rounded-md border shadow-lg cursor-pointer hover:animate-pulse">
              <div className="w-11/12 mx-auto flex items-center justify-center gap-5 h-full  ">
                <img src={kycimg} alt="" className='w-24' />
                <h1 className='text-sm md:text-md'>Submit KYC Information</h1>
              </div>
            </div>
            <div onClick={() => { setScreen(3), setSets(true), setSetsName('Change Password') }} className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer hover:animate-pulse">
              <div className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
                <img src={passwordimg} alt="" className='w-24' />
                <h1 className='text-sm md:text-md'>Change Account Password</h1>
              </div>
            </div>
          </div>
          
            <div className="w-11/12 mx-auto md:flex gap-3">
              <div onClick={() => { setScreen(4), setSets(true), setSetsName('Edit Profile') }} className="bg-white px-4 h-48 md:w-1/2 md:grid md:grid-cols-1 w-11/12 mx-auto mt-5 rounded-md border shadow-lg cursor-pointer md:mx-0 hover:animate-pulse">
                <div className="w-11/12 mx-auto flex items-center justify-center gap-5 h-full">
                  <img src={profileimg} alt="" className='w-24' />
                  <h1 className='text-sm md:text-md'>Edit Profile Details</h1>
                </div>
              </div>
              <div onClick={() => { setScreen(5), setSets(true), setSetsName('Change Account Email') }} className="bg-white px-4 h-48 md:w-1/2 md:grid md:grid-cols-1 w-11/12 mx-auto mt-5 rounded-md border shadow-lg cursor-pointer md:mx-0 hover:animate-pulse">
                <div className="w-11/12 mx-auto flex items-center justify-center gap-5 h-full">
                  <img src={emailImg} alt="" className='w-24' />
                  <h1 className='text-sm md:text-md'>Change Account Email</h1>
                </div>
              </div>
            </div>
       

        </>}
      {screen === 2 && <Kyc setScreen={setScreen} setActive={setActive} setSets={setSets} setSetsName={setSetsName} />}
      {screen === 3 && <ChangePassword setScreen={setScreen} setSets={setSets} setSetsName={setSetsName} />}
      {screen === 4 && <EditProfile data={data} setScreen={setScreen} setSets={setSets} setSetsName={setSetsName} />}
      {screen === 5 && <ChangeEmail data={data} setScreen={setScreen} setSets={setSets} setSetsName={setSetsName} />}
    </div>

  )
}

export default Settings