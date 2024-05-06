import React, { useState } from 'react'
import Loading from '../../components/Loading'
import { CookieName, errorMessage, successMessage } from '../../components/utils/UtilNames'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Apis, PostApi } from '../../services/Apis'

const Logout = ({ setActive }) => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const Logout = async () => {
    setLoading(true)
    const response = await PostApi(Apis.auth.logout)
    try {
      if (response.status === 200) {
        successMessage(response.msg)
        Cookies.remove(CookieName)
        navigate('/login')
      } else {
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
    <div className="md:w-11/12 mx-auto h-[80dvh] relative flex items-center justify-center">
      {loading && <Loading />}
      <div className='absolute top-1/2 h-full  md:w-2/4 w-11/12 abs '>
        <div className="flex flex-col w-full gap-5 px-4 py-5 mainbg text-white rounded-md">
          <h1 className='text-center'>Are you sure you want to logout?</h1>
          <div className="w-11/12 mx-auto flex justify-between items-center">
            <button onClick={() => setActive('home')} className='px-4 py-2 bg-red-500 rounded-md'>cancel</button>
            <button onClick={Logout} className='px-4 py-2 bg-green-500 rounded-md'>proceed</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout