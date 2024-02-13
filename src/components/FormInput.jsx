import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const FormInput = ({ formtype = 'text', placeholder }) => {

    const [show, setShow] = useState(false)
    const Icon = show === true ? FaEye  : FaEyeSlash
    return (
        <div className='w-[100%]  '>
            {formtype === 'text' && <input type='text' className='h-10 w-full rounded-lg pl-3 text-md outline-none text-black' placeholder={placeholder} />}


            {formtype === 'email' && <input type='email' className='h-10 w-full rounded-lg pl-3 text-md outline-none text-black' placeholder={placeholder} />}


            {formtype === 'number' && <input type='number' placeholder={placeholder} />}
            {formtype === 'textarea' && <textarea rows={4} cols={50} placeholder="Tell us about yourself"></textarea>}


            
                {formtype === 'password' && 
                <div className="flex items-center w-full bg-white rounded-lg">
                <input type={show === true ? 'text': 'password'} className='h-10 w-3/4 rounded-lg pl-3 text-md outline-none text-black' placeholder={placeholder} />
                <Icon onClick={()=> setShow(prev => !prev)} className='h-6 w-1/4 rounded-lg pl-3 text-sm outline-none text-black'/>
            </div>}
        </div>
    )
}

export default FormInput