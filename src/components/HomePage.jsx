import React from 'react'
import PageLayout from './PageLayout'
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate()

    const finance = [
        {
            title: 'Financial Planning: Our experienced advisors will work with you to create a comprehensive financial plan tailored to your goals and aspirations.'
        },

        {
            title: 'Investment Management: Let our experts help you navigate the complexities of the financial markets and build a diversified investment portfolio designed to maximize returns and minimize risk.'
        },

        {
            title: 'Retirement Planning: Ensure a comfortable retirement by partnering with us to develop a strategic retirement plan that considers your lifestyle, income needs, and long- term objectives.'
        },

        {
            title: 'Wealth Management: From wealth accumulation to wealth preservation, we provide customized solutions to help you grow and protect your assets over time.'
        }
    ]

    return (
        <PageLayout>
            <div className=" w-full ">
                <div className="w-11/12 mx-auto ">
                    <h1 className='text-4xl w-3/4 font-bold mt-10'>Welcome to AS Finance</h1>
                    <div className="mt-10 mb-5">
                        <h3 className='text-left font-medium'>At AS Finance, we're committed to empowering your financial journey with expertise, integrity, and personalized solutions. Whether you're planning for retirement, investing for the future, or seeking to manage your wealth more effectively, we're here to guide you every step of the way.</h3>
                    </div>
                    <div className="mt-10 ">
                        <div className="text-center l bg-black text-white font-bold py-3 rounded-full text-2xl">OUR SERVICES</div>
                        <div className=" h-fit py-2">
                         {finance.map((item,i) =>(
                            <ul key={i} className=' mx-auto  h-full  flex flex-col gap-3 '>
                                <span className='bg-black  py-2 flex items-center justify-center'><FaRegCircleCheck className='text-white text-2xl flex w-full mt-2'/></span>
                                <li className='mt-2 font-semibold rounded-sm text-left  bg-slate-100 py-3 ' > {item.title}</li>
                            </ul>
                         ))}
                        </div>
                    </div>
                    <div onClick={() =>navigate(`/signup`)} className="mt-10 text-center bg-black text-white font-bold py-5 animate-bounce rounded-full text-2xl">Get Started</div>
                </div>


            </div>
        </PageLayout>
    )
}

export default HomePage