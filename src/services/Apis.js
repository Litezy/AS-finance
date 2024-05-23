import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../components/utils/UtilNames'
import { io } from 'socket.io-client'

export const URL = 'http://localhost:5000'
export const profileImg = 'http://localhost:5000'

export const socket = io(URL)


socket.emit('testing', 'hello world');

// console.log(`connected to client ${socket.id}`)
export const non_auth_urls = {
    signup: 'user/create',
    reset_code: 'user/resend-otp',
    verify: 'user/validateacc',
    uploadimg: 'user/uploadimg',
    login: 'user/login',
    find_acc: 'user/find-acc',
    validate_acc: 'user/validate-user-acc',

}

export const auth_urls = {
    profile: 'user/profile',
    update_profile: 'user/update-profile',
    update_password: 'user/update-password',
    change_image: 'user/change-image',
    logout: 'user/logout',
    balance: 'funds/balance',
    all_trnx: 'funds/all-trnx',
    deposits: 'funds/user-deposits',
    deposit: 'funds/deposit',
    withdraw: 'funds/withdraw',
    withdraws: 'funds/user-withdraws',
    notify: 'notify/notify',
    mark_as_read: 'notify/all-notify',
    undo_read: 'notify/undo-notify',
    notice: 'notify/notice',
    pending_deposits: 'funds/pending-depo',
    pending_withdraws: 'funds/pending-with',
    password_change: 'user/change-password',
    email_change: 'user/change-email',
    logout: 'user/logout',
}

const Admin_url = 'admin'
const adminUrls = {
    admin_profile: Admin_url + '/admin-profile',
    all_users: Admin_url + '/all',
    all_deposits: Admin_url + '/all-deposits',
    all_kycs: Admin_url + '/all-kycs',
    all_plans: Admin_url + '/all-plans',
    all_withdrawals: Admin_url + '/all-withdrawals',
    pending_deposits: Admin_url + '/pending-deposits',
    pending_withdraws: Admin_url + '/pending-withdrawals',
    confirmed_deposits: Admin_url + '/confirmed-deposits',
    confirmed_withdraws: Admin_url + '/confirmed-withdrawals',
    approve_deposit: Admin_url + '/validate-deposit',
    decline_deposit: Admin_url + '/decline-depo',
    approve_withdraw: Admin_url + '/validate-withdraw',
    decline_withdraw: Admin_url + '/decline-with',
    pending_kycs: Admin_url + '/pending-kycs',
    approve_kyc: Admin_url + '/kyc-approve',
    decline_kyc: Admin_url + '/kyc-decline'
}

const chatsUrl = 'chats'
export const ChatsUrls = {
    create: chatsUrl + '/create-room',
    delete: chatsUrl + '/delete-room',
    msgs: chatsUrl + '/fetch-msgs',
    send_chat: chatsUrl + '/send-chat',
    fetch_probs: chatsUrl + '/probs',
    send_prob: chatsUrl + '/send-prob',
    fetch_active_rooms: chatsUrl + '/fetch-active-rooms',
    fetch_inactive_rooms: chatsUrl + '/fetch-inactive-rooms',
    unread_msgs:chatsUrl+'/fetch-unread',
    read_msgs: chatsUrl + '/read',
    inactivate_chats: chatsUrl + '/inactivate-chats',
    inactive_chatmsgs: chatsUrl + '/inactive-msgs'
}
const planUrl = 'plans'
export const plan_urls = {
    allUserplans: planUrl + '/all',
    create: planUrl + '/create'
}
const kyc_url = 'user/kyc-upload'
export const Apis = {
    admins: adminUrls,
    auth: auth_urls,
    Plans: plan_urls,
    non_auth: non_auth_urls,
    kyc: kyc_url,
    Chats: ChatsUrls
}

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
