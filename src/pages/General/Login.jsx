import React from 'react'
import PageLayout from '../../components/PageLayout'
import FormInput from '../../components/FormInput'
import Formbutton from '../../components/Formbutton'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-between h-full bg w-11/12 mx-auto overflow-hidden">
        <div className="bg-black/40 h-full w-full text-white flex items-center justify-center">
          <div className="w-3/4 mx-auto ">
            <div className="text-4xl font-bold text-[#edfd93]">Login Account</div>
            <form>
              <div className="mt-5">
                <div className="font-bold text-orange-500">Username</div>
                <FormInput formtype='text' placeholder={`enter your username`} />
              </div>
              <div className="mt-2 ">
                <div className="font-bold text-orange-500 text-xl">Password</div>
                <FormInput formtype='password' placeholder={`*******`} />
                <button className='w-fit text-orange-500 font-bold mt-2 ml-auto'>forgot password?</button>
              </div>
              <div className="mt-10">
                <Formbutton name={`Login`} />
              </div>

            </form>
            <div className="flex items-center justify-between mt-5">
              <p className='font-medium'>Don't have an Account yet?</p>
              <Link to={`/signup`}><button className='px-2 py-1 bg-orange-500 text-white font-bold'>Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login