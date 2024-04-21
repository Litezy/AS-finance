import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../components/utils/UtilNames'

export const URL = 'http://localhost:5000/api'
export const profileImg = 'http://localhost:5000'

export const non_auth_urls = {
    signup: 'user/create',
    reset_code: 'user/resend-otp',
    verify: 'user/validateacc',
    uploadimg: 'user/uploadimg',
    login: 'user/login',
    
}
    
export const auth_urls = {
    profile: 'user/profile',
    update_profile: 'user/update-profile',
    update_password: 'user/update-password',
    change_image:'user/change-image',
    logout:'user/logout',
    balance:'funds/balance',
    all_trnx:'funds/all-trnx',
    deposits: 'funds/user-deposits',
    deposit:'funds/deposit',
    withdraw:'funds/withdraw',
    withdraws:'funds/user-withdraws',
    notify:'notify/notify',
    mark_as_read:'notify/all-notify',
    undo_read:'notify/undo-notify',
    notice:'notify/notice',
    pending_deposits:'funds/pending-depo',
    pending_withdraws:'funds/pending-with',
    password_change:'user/change-password',
    email_change:'user/change-email',
    logout:'user/logout',
}

const planUrl = 'plans'
export const plan_urls ={
  allUserplans : planUrl + '/all',
  create: planUrl + '/create'
}
 const kyc_url = 'user/kyc-upload'
export const Apis = {
    auth: auth_urls,
    Plans:plan_urls,
    non_auth: non_auth_urls,
    kyc:kyc_url
}
// console.log(Apis.kyc)
export const ClientGetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}
export const ClientPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const GetApi = async (endpoint) => {
    const getCookie = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${getCookie}` // Include the JWT token in the Authorization header
        }
    })
    return response.data
}



export const PostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
export const LogoutApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
export const PutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
