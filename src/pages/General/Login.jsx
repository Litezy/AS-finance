import React, { useCallback, useEffect, useState } from 'react'
import PageLayout from '../../components/PageLayout'
import FormInput from '../../components/FormInput'
import Formbutton from '../../components/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../../assets/logo.png'
import Loading from '../../components/Loading'
import { CookieName, UserRole, errorMessage, successMessage } from '../../components/utils/UtilNames'
import { Apis, ClientPostApi, GetApi, PostApi, auth_urls } from '../../services/Apis'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import { FaArrowLeft } from 'react-icons/fa'
import { GiBoltEye } from 'react-icons/gi'
import { LuEye } from 'react-icons/lu'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [screen, setScreen] = useState(1)
  const [forms, setForms] = useState({
    email: '',
    password: '',
    reset_code: '',
    new_password: '',
    confirm_password: ''
  })
  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const LoginUser = async (e) => {
    e.preventDefault()
    if (!forms.email || !forms.password) {
      return errorMessage('Incomplete request')
    }
   
    const formdata = {
      email: forms.email,
      password: forms.password
    }
    setLoading(true)
    try {
      const response = await PostApi(Apis.non_auth.login, formdata)

      if (response.status === 200) {
        // return console.log(response)
        Cookies.set(CookieName, response.token,)
        successMessage(response.msg)
        const decoded = decodeToken(response.token)
        const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
        if (findUserRole) {
          navigate(findUserRole.url)
        }
      }
      else {
        errorMessage(response.msg)
      }
    }
    catch (error) {
      return errorMessage(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const findAcc = async (e) => {
    e.preventDefault()
    if (!forms.email) return errorMessage('Please input a valid email')
    setLoading(true)
    const formdata = {
      email: forms.email
    }
    try {
      const response = await ClientPostApi(Apis.non_auth.find_acc, formdata)
      if (response.status === 200) {
        setScreen(3)
      } else {
        return errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(error.mesage)
    } finally {
      setLoading(false)
    }
  }
  const verifyEmail = async (e) => {
    e.preventDefault()
    const formdata = {
      email: forms.email,
      reset_code: forms.reset_code
    }
    setLoading(true)
    try {
      const response = await ClientPostApi(Apis.non_auth.validate_acc, formdata)
      if (response.status === 200) {
        successMessage('email verified successfully')
        setForms({
          ...forms,
          reset_code: ''
        })
        setScreen(4)
      } else {
        errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(error.message)
    } finally {
      setLoading(false)
    }

  }
  const ResendOtp = async () => {
    const formdata = {
      email: forms.email
    }
    setLoading(true)
    try {
      const response = await ClientPostApi(Apis.non_auth.reset_code, formdata)
      if (response.status === 200) {
        successMessage('Otp sent successfully')
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }

  const ChangePassword = async (e) => {
    e.preventDefault()
    if (!forms.new_password || !forms.confirm_password) return errorMessage('incomplete request to change password')
    if (forms.new_password.length <= 4) return errorMessage("Password's character must be upto 5")
    if (forms.confirm_password !== forms.new_password) return errorMessage('Passwords do not match')
    const formdata = {
      email: forms.email,
      new_password: forms.new_password,
      confirm_password: forms.confirm_password
    }
    // return console.log(formdata)
    setLoading(true);
    try {
      const response = await PostApi(Apis.auth.update_password, formdata)
     
      if (response.status === 200) {
        successMessage(response.msg)
        setForms({
          ...forms,
          email: '',
          password: '',
          reset_code: ''
        })
        setScreen(1)
      } else {
        errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(error.message);
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <div className="signup h-screen flex items-center justify-center">
      {screen === 1 &&
        <div className="h-[90%] w-full">
          <form className='md:w-[40%] rounded-e-md w-[90%]  flex items-center flex-col justify-center h-full mx-auto  bg-white ' onSubmit={LoginUser}>
            <div className="  font-bold md:text-2xl flex items-center justify-center mb-10  pt-2
      ">Login Account</div>
            <div className="w-3/4">
              <div className="mb-5 w-full">
                <h1 className='text-md font-bold '>Email</h1>
                <FormInput formtype='email' placeholder={`email`} onchange={handleChange} name={`email`} value={forms.email} />
              </div>

              <div className=" w-full">
                <h1 className='text-md font-bold '>Password</h1>
                <FormInput formtype='password' placeholder={`*******`} onchange={handleChange} name={`password`} value={forms.password} />
              </div>
              <button type='button' onClick={() => setScreen(2)} className='text-sm mt-2 main'>forgot password?</button>

            </div>

            <div className=" rounded-md w-10/12 mainbg py-4 flex items-center h-10 mx-auto justify-center mt-5">
              <button className='md:text-xl font-bold  w-full  text-white   text-center '>Login</button>
            </div>
            <div className="w-fit mr-auto ml-10 mt-5">
              <h2 className='text-sm '>Don't have an account? <Link className='main font-bold underline' to={`/signup`}>Sign up</Link></h2>
            </div>
            <div className="w-fit mr-auto ml-10">
              <h2 className='text-sm '>Back to <Link className='main font-bold underline'>Home</Link></h2>
            </div>
          </form>
        </div>}

      {screen === 2 &&
        <div className='h-[96] w-full'>

          <form className='md:w-[40%] rounded-e-md w-[90%]  flex items-center flex-col
           justify-center h-96 mx-auto  bg-white ' onSubmit={findAcc}>
            <div onClick={() => setScreen(1)} className="w-fit mr-auto ml-3 cursor-pointer  main">
              <FaArrowLeft className='text-2xl' />
            </div>
            <div className="  font-bold md:text-2xl flex items-center justify-center mb-10 main  pt-2
      ">Find My Account</div>
            <div className="w-3/4">
              <div className="mb-5 w-full">
                <h1 className='text-md font-bold '>Input Account Email</h1>
                <FormInput formtype='email' placeholder={`email`} onchange={handleChange} name={`email`} value={forms.email} />
              </div>
              <div className="w-fit ml-auto ">
                <button className='mainbg px-4 py-1 rounded-full text-white'>next</button>
              </div>
            </div>
          </form>
        </div>
      }

      {screen === 3 &&
        <div className='w-full mx-auto full'>
          <form className='md:w-[50%] rounded-e-md w-[90%]  flex items-center flex-col
           justify-center h-96 mx-auto  bg-white' onSubmit={verifyEmail}>
            <div className=" main font-bold text-4xl flex items-center justify-center mb-10"><h1> Email Verification</h1></div>
            <div className="flex items-center   gap-10 w-full">
              <div className="md:w-11/12  w-3/4 mx-auto">
                <div className=""><h1>A verification code has been sent to your email <span className='main font-bold'>{forms.email?.slice(0, 4)}*****{forms.email?.slice(-10)}</span>,  Paste the code below to verify your email.</h1></div>
                <div className="mb-5 w-11/12 mx-auto  flex items-center flex-col ">
                  <h1 className='text-xl font-bold mt-3'>verification code:</h1>
                  <div className="w-fit flex items-center justify-center">
                    <FormInput formtype='code' onchange={handleChange} placeholder={`******`} name={`reset_code`} value={forms.reset_code} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <p>Didn't receive code?</p>
                    <button onClick={ResendOtp} type='button' className='main font-bold underline'>resend</button></div>
                  <div className="w-fit ml-auto">
                    <button className='mainbg px-5 py-2 rounded-full text-white font-bold'>Verify Email</button>
                  </div>
                </div>
                <div className="w-fit"><button onClick={() => setScreen(2)} className='main font-bold underline'>change email</button></div>
              </div>
            </div>
          </form>
        </div>}

      {screen === 4 &&
        <div className='w-full mx-auto full'>
          <form className='md:w-[50%] rounded-e-md w-[90%]  flex items-center flex-col
          justify-center h-96 mx-auto  bg-white' onSubmit={ChangePassword}>
            <div className="flex flex-col w-3/4  mt-5">
              <h1 className='text-center md:text-2xl font-bold main text-lg'>Change Password</h1>
              <h1 className='font-bold'>New Password:</h1>
              <FormInput formtype='password' onchange={handleChange} placeholder={`******`} name={`new_password`} value={forms.new_password} />

              <h1 className='mt-4 font-bold'>Confirm New Password:</h1>
              <FormInput formtype='password' onchange={handleChange} placeholder={`******`} name={`confirm_password`} value={forms.confirm_password} />
            </div>

            <div className="flex flex-col w-full  mt-5">

            </div>

            <div className="w-fit  mt-5">
              <button className='px-5 py-1 mainbg text-white rounded-full'>Submit</button>
            </div>
          </form>
        </div>
      }
     
    </div>
  )
}

export default Login