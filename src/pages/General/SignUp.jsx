import React, { useEffect, useRef, useState } from 'react'
import PageLayout from '../../components/PageLayout'
import FormInput from '../../components/FormInput'
import Formbutton from '../../components/Formbutton'
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { errorMessage, successMessage } from '../../components/utils/UtilNames'
import { FaEdit } from "react-icons/fa";
import Countries from '../../components/utils/Country';

import Loading from '../../components/Loading';
import { Apis, ClientPostApi, GetApi, auth_urls } from '../../services/Apis';
import { IoSearchSharp } from "react-icons/io5";

const SignUp = () => {

  const navigate = useNavigate()
  const [check, setCheck] = useState(false)
  const [screen, setScreen] = useState(1)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDiv, setOpenDiv] = useState(false)
  const [filter, setFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [signupUser,setSignUpUser] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState(Countries)
  // const [AlterCountries setFilteredCountries] = useState(Countries)
  const imageRef = useRef()
  const [forms, setForms] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    reset_code: '',
  })

  const [userimg, setUserImg] = useState({
    img: '',
    image: ''
  })
  const [flag, setFlag] = useState({
    img: '',
    image: ''
  })
  const checkFunc = () => {
    setCheck(prev => !prev)
  }
  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }
  const defaultCountry = Countries[0]
  useEffect(() => {
    setForms({
      ...forms,
      country: defaultCountry.country
    });
    setFlag({
      // img: URL.createObjectURL(defaultCountry.flag),
      ...flag,
      image: defaultCountry.flag
    })
    // console.log(flag.image)
  }, [])

  const submitForms = async (e) => {
    e.preventDefault()
    if (!forms.full_name || !forms.email || !forms.username || !forms.password || !forms.confirm_password || !forms.phone) return errorMessage('Incomplete request')
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(forms.email)) return errorMessage('Input a valid email')
    if (forms.username.length <= 4) return errorMessage('username must be up to at least 5 characters')
    if (forms.password.length <= 5) return errorMessage('password must be up to at least 6 characters')
    if (forms.confirm_password !== forms.password) return errorMessage('password(s) mismathced')
    if (check === false) return errorMessage('Agree to our T&Cs to proceed')


    const formdata = new FormData()
    formdata.append('full_name', forms.full_name)
    formdata.append('username', forms.username)
    formdata.append('email', forms.email)
    formdata.append('password', forms.password)
    formdata.append('confirm_password', forms.confirm_password)
    formdata.append('phone', forms.phone)


    setLoading(true)
    try {
      const response = await ClientPostApi(Apis.non_auth.signup, formdata)
      // console.log(response)
      if (response.status === 200) {
        successMessage('sign up successful, verify your email')
        setForms({
          ...forms,
          [e.target.name]: ''
        })
        setScreen(2)
        setSignUpUser(true) 
      }
      else {
        errorMessage(response.msg)
      }

    } catch (error) {
      errorMessage(error.message)
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
    const form2 = {
  
    }
    // return console.log(formdata)
    try {
      const response = await ClientPostApi(Apis.non_auth.verify, formdata)
      console.log(response)
      if (response.status === 200) {
        successMessage('email verified successfully')
        setScreen(3)
      }
    } catch (error) {
      errorMessage(error.message)
    }

  }

  const handleProfile = (e) => {
    const file = e.target.files[0]
    if (file.size >= 1000000) {
      imageRef.current.value = null
      return errorMessage('file too large')
    }
    if (!file.type.startsWith(`image/`)) {
      imageRef.current.value = null
      return errorMessage('Invalid file format detected, try with a different photo')
    }
    setUserImg({
      img: URL.createObjectURL(file),
      image: file
    })

  }

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.value = ''
    }
    setUserImg({
      img: '',
      image: ''
    })
  }


  const SaveProfile = e => {
    e.preventDefault()
    successMessage('Signed up successfully')
    setScreen(4)
  }



  const handleSearch = (selectedCountry) => {
    setForms({
      ...forms,
      country: selectedCountry.country,
      flag: selectedCountry.flag
    })
    setShow(false);
    setFilter(false)
    setOpenDiv(false)
    setFilteredCountries(Countries)
  }

  const handleFilter = (e) => {
    let search = e.target.value
    if (!search) {
      return setFilteredCountries(Countries);
    }
    const searchTerm = search.toLowerCase();
    const filteredItems = filteredCountries.filter(item => item.country.toLowerCase().startsWith(searchTerm));
    setFilteredCountries(filteredItems);

  };


  const ResendOtp = async () => {
    setLoading(true)
    try {
      const response = await ClientPostApi(Apis.non_auth.reset_code)
      if (response.status === 200) {
        successMessage('Otp sent successfully')
      }
    } catch (error) {
      errorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const FinishProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formdata = new FormData()
    formdata.append('image', userimg.image)
    formdata.append('email', forms.email)
    formdata.append('username', forms.username)
    try {
      const response = await ClientPostApi(Apis.non_auth.uploadimg, formdata)
      console.log(userimg.image)
      if (response.status === 200) {
        successMessage('profile image uploaded successfuly')
        navigate(`/dashboard`)
      }
    } catch (error) {
      errorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="w-full h-screen py-10 signup  flex items-center justify-center">
      <div className="h-[90dvh]  overflow-auto bg-white py-10 md:w-2/4   scroll">
        {loading && <Loading />}
        <div className="w-full mx-auto h-full  ">
          {screen === 1 &&
            <div className="w-full  ">
              <form className='md:w-[80%] rounded-e-md w-[95%]  flex items-center flex-col justify-center h-full mx-auto  ' onSubmit={submitForms}>
                <div className="  font-bold md:text-2xl flex items-center justify-center mb-10  pt-2
                  ">Sign up for an account</div>

                <div className="w-3/4 ">
                  <div className="mb-5 w-full">
                    <h1 className='text-md main font-bold'>Full Name</h1>
                    <FormInput formtype='text' onchange={handleChange} placeholder={`full name`} name={`full_name`} value={forms.full_name} />
                  </div>
                  <div className="mb-5 w-full">
                    <h1 className='text-md font-bold main'>Email</h1>
                    <FormInput formtype='email' placeholder={`email`} onchange={handleChange} name={`email`} value={forms.email} />
                  </div>
                  <div className="mb-5 w-full">
                    <h1 className='text-md font-bold main'>Username</h1>
                    <FormInput formtype='text' placeholder={`username`} onchange={handleChange} name={`username`} value={forms.username} />
                  </div>
                  <div className="mb-5 w-full">
                    <h1 className='text-md font-bold main'>Password</h1>
                    <FormInput formtype='password' placeholder={`*******`} onchange={handleChange} name={`password`} value={forms.password} />
                  </div>
                  <div className="mb-5 w-full">
                    <h1 className='text-md font-bold main'>Confirm Password</h1>
                    <FormInput formtype='password' placeholder={`*******`} onchange={handleChange} name={`confirm_password`} value={forms.confirm_password} />
                  </div>
                  <div className="mb-5 w-full">
                    <div className="text-md font-bold main">Phone</div>
                    <FormInput formtype='number' placeholder={`enter phone no.`} onchange={handleChange} name={`phone`} value={forms.phone} />
                  </div>
                </div>

                <div className="w-3/4">
                  <div className="w-full">
                    <label className='flex items-center justify-center main cursor-pointer'>
                      <input onClick={checkFunc} type="checkbox" checked={check} className='w-10 cursor-pointer' />
                      <p className='text-sm'>By checking the box, you agree to our <span className='main font-bold underline'>T&C's</span> with our <span className='main font-bold underline'>Privacy Policy</span></p>
                    </label>
                  </div>
                  <div className="flex mt-5 items-center justify-between md:w-full w-11/12 mx-auto">
                    <h2 className='text-sm '>Already have an account? <Link className='main font-bold underline' to={`/login`}>Login</Link></h2>


                    <div className="w-fit ml-auto py-4">
                      <button className='md:px-5 px-4 py-1   md:py-2 md:text-xl font-bold text-white rounded-full mainbg'>Sign up</button>
                    </div>
                  </div>


                </div>

              </form>
            </div>
          }

          {screen === 2 && <div className='w-11/12 mx-auto h-screen'>
            <form className='flex items-center justify-center h-[90%] rounded-md  mx-auto bg-white flex-col ' onSubmit={verifyEmail}>
              <div className=" main font-bold text-3xl flex items-center justify-center mb-10"><h1> Email Verification</h1></div>
              <div className="flex items-center  gap-10 w-full">
                <div className=" w-3/4 mx-auto">
                  <div className=""><h1>A verification code has been sent to your email <span className='main] font-bold'>{forms.email?.slice(0, 4)}*****{forms.email?.slice(-10)}</span> Paste the code below to verify your email.</h1></div>
                  <div className="mb-5 w-2/4 mx-auto flex flex-col items-center justify-center">
                    <h1 className='text-xl font-bold mt-3'>verification code:</h1>
                    <FormInput formtype='code' onchange={handleChange} placeholder={`******`} name={`reset_code`} value={forms.reset_code} />
                  </div>
                  <div className="flex items-center ">
                    <div className="">Didn't receive code?
                      <button onClick={ResendOtp} type='button' className='main font-bold'>Resend</button></div>
                    <div className="w-fit ml-auto">
                      <button className='mainbg px-5 py-2 rounded-full text-white font-bold'>Verify Email</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>}
          {screen === 3 && <div className='w-11/12 mx-auto h-screen'>
            <form className='flex items-center justify-center md:h-[90%] py-10 md:py-0 rounded-md md:w-2/4 mx-auto px-3 bg-white flex-col' onSubmit={SaveProfile}>
              <div className="text-3xl font-bold">Add a Profile Photo</div>
              <label className='relative'>
                {userimg.img ? <img src={userimg.img} className='h-[18rem] w-[18rem] rounded-full object-cover' /> :
                  <div className="w-60 h-60 border rounded-full mx-auto mt-5 flex items-center justify-center cursor-pointer">
                    <input ref={imageRef} type="file" className='hidden' onChange={handleProfile} />
                    <FaUserLarge className="text-6xl" />
                  </div>}

                {userimg.img && <FaEdit onClick={changeImage} className='absolute top-3 right-0 cursor-pointer text-2xl' />}
              </label>
              <div className="flex mt-5 items-center justify-between w-3/4 ">
                <div className=""><button type='button' onClick={() => navigate(`/admin`)} className='mainbg px-5 py-2 rounded-full text-white font-bold'>Skip</button></div>
                <div className="w-fit ml-auto">
                  <button onClick={FinishProfile} className='mainbg px-5 py-2 rounded-full text-white font-bold'>Finish</button></div>
              </div>
            </form>
          </div>}

          {screen === 4 && <>

            <div className="w-full h-[30rem] flex items-center justify-center">
              <div className="bg-[#f9751a] w-2/4 h-40 mx-auto flex items-center justify-center rounded-xl">
                <button onClick={() => navigate(`/admin`)} className='border-white border-2 text-white font-bold px-5 py-2 rounded-full'>Proceed to Dashboard</button>
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>

  )
}

export default SignUp



