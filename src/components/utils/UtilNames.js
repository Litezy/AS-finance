
import toast from "react-hot-toast"


export const errorMessage = (message) => {
    return toast.error(message, {
        duration: 4000,
        position: "top-center"
    })
}
export const successMessage = (message) => {
    return toast.success(message, {
        duration: 4000,
        position: "top-center",
        
    })
}
export const CookieName ='blaze_token';
export const UserRole = [
    {
        role: 'user',
        url: '/dashboard'
    },
    {
        role: 'admin',
        url: '/admin'
    }
]

export const formatter = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits:0
   })