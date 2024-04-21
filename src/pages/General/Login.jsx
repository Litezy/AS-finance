import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import FormInput from '../../components/FormInput'
import Formbutton from '../../components/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../../assets/logo.png'
import Loading from '../../components/Loading'
import { CookieName, UserRole, errorMessage, successMessage } from '../../components/utils/UtilNames'
import { Apis, PostApi, auth_urls } from '../../services/Apis'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState({
    email: '',
    password: ''
  })

  const LoginUser = async (e) => {
    e.preventDefault()
    if (!forms.email || !forms.password) {
      return errorMessage('Incomplete request')
    }
    if (forms.password.length < 5) {
      return errorMessage('Password must be at least 5 characters')
    }
    const formdata = {
      email: forms.email,
      password: forms.password
    }
    setLoading(true)
    try {
      const response = await PostApi(Apis.non_auth.login, formdata)
      console.log(response)
      if(response.status === 200){
        successMessage(response.msg)
        Cookies.set(CookieName, response.token, )
        const decoded = decodeToken(response.token)
        const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
        if(findUserRole){
          navigate(findUserRole.url)
        }
      }else{
        errorMessage(response.msg)
      }

    } catch (error) {
      return errorMessage(error.message)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <PageLayout>
      {loading && <Loading />}
      <div className="md:flex  items-center md:mt-10 justify-between bg-white w-full mb-10 mx-auto overflow-y-auto h-fit">
        <div className="md:w-1/2 md:h-full flex items-center justify-center order-2 mt-10 md:mt-0">
          <img src={loginimg} className='hidden md:block rounded-full w-96 md:w-2/2' alt="" />
        </div>
        <div className="h-full w-full  md:mt-0 text-white flex items-center justify-center md:w-1/2 order-1 ">
          <div className="w-3/4 mx-auto  ">
            <div className="text-4xl font-bold text-[#430a5d] md:text-3xl">Login Account</div>
            <form>
              <div className="mt-5 ">
                <div className="font-bold text-[#E26EE5]">Email</div>
                <FormInput formtype='email' placeholder={`enter your email `} name={'email'} value={forms.email} onchange={(e) => setForms({ ...forms, email: e.target.value })} />
              </div>
              <div className="mt-2 ">
                <div className="font-bold text-[#E26EE5] ">Password</div>
                <FormInput formtype='password' placeholder={`*******`} name={'password'} value={forms.password} onchange={(e) => setForms({ ...forms, password: e.target.value })} />
                <button type='button' className='w-fit text-[#430a5d] text-sm font-bold mt-2 ml-auto underline'>forgot password?</button>
              </div>
              <div className="mt-10">
                <Formbutton onClick={LoginUser} name={`Login`} className="" />
              </div>

            </form>
            <div className="flex items-center  mt-5">
              <p className='font-bold text-[#111827]'>Don't have an Account yet?</p>
              <Link to={`/signup`}><button className='px-5 py-1 text-[#E26EE5] underline font-bold'>Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login