import React from 'react'

const Formbutton = ({ name }) => {
    return (
        <div className='w-full '>
            <button className='bg-[#edfd93] text-black font-bold w-2/4 py-2 text-2xl rounded-3xl'>{name}</button>
        </div>
    )
}

export default Formbutton