import React, { useCallback, useEffect, useState } from 'react'
import AdminPageLayout from './AdminPageLayout'
import { errorMessage, formatter, successMessage } from '../../components/utils/UtilNames';
import Plans from '../../components/Plans';

import { FaChevronLeft, FaChevronUp } from 'react-icons/fa';
import { Apis, GetApi, PostApi } from '../../services/Apis';
import { useQuery } from '@tanstack/react-query';
import InvestmentPlan from './InvestmentPlan';
import Loading from '../../components/Loading';

const Investments = () => {

  
  const [isActive, setIsActive] = useState(false)
  const [plans, setPlans] = useState([
    {
      id: 'bronze',
      title: 'Bronze Plan',
      amount: 500,
      duration:'30 days',
      max_deposit: 1500,
      min_with: 1000,
      duration: '30 days',
      roi: '10%',
      returns_cap: 'No',
    },
    {
      id: 'silver',
      title: 'Silver Plan',
      amount: 1500,
      duration:'60 days',
      max_deposit: 2500,
      min_with: 1200,
      duration: '60 days',
      roi: '13%',
      returns_cap: 'No',
    },
    {
      id: 'gold',
      title: 'Gold Plan',
      amount: 2500,
      max_deposit: 3500,
      min_with: 1500,
      duration: '90 days',
      roi: '15%',
      returns_cap: 'No',
    },
    {
      id: 'platinum',
      title: 'Platinum Plan',
      amount: 3500,
      duration:'6 months',
      max_deposit: 4500,
      min_with: 3000,
      duration: '180 days',
      roi: '17%',
      returns_cap: 'Yes',
    },
    {
      id: 'diamond',
      title: 'Diamond Plan',
      amount: 5000,
      duration:'1 year',
      max_deposit: 10000,
      min_with: 4000,
      duration: '365 days',
      roi: '20%',
      returns_cap: 'Yes',
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState({})
  const [userplans, setUserPlans] = useState({} || [])
  const [screen, setScreen] = useState(1)
  const [loading,setLoading] = useState(false)

  const handleSelect = (plan) => {
    setSelectedPlan(plan)
  }


  const submitPlan = () => {
    setScreen(3)
  }

 
  const purchasePlan = async ()=>{
    const formdata = {
      title: selectedPlan.title, 
      amount: selectedPlan.amount,
      duration: selectedPlan.duration,
      max_deposit: selectedPlan.max_deposit,
      min_with: selectedPlan.min_with,
      duration: selectedPlan.duration,
      roi: selectedPlan.roi,
      returns_cap: selectedPlan.returns_cap
    }
    setLoading(true)
    try {
      const response = await PostApi(Apis.Plans.create, formdata)
      if(response.status === 200){
        successMessage(response.msg)
        setScreen(1)
      }else{
        errorMessage(response.msg)
      }
    } catch (error) {
      errorMessage(error.message)
    }finally{
      setLoading(false)
    }
  }

 
  return (

    <div className="mt-20 w-full ">
      {screen === 1 && 
        <div className='md:h-screen h-20 '>
          <div className="mt-20 w-full">
            <InvestmentPlan setScreen={setScreen} />
          </div>
        </div>}
      {screen === 2 &&
        <>
          <div className="mt-20 w-full">
          <div onClick={() => setScreen(1)} className="w-fit mr-auto ml-3 cursor-pointer">
          <FaChevronLeft className='text-2xl '/>
          </div>
            <h1 className='main md:text-2xl text-center py-5 font-bold '>Select the Perfect Plan to Elevate Your Financial Journey!</h1>
        
            <div className="md:grid md:grid-cols-3 flex flex-col gap-8 w-11/12 mx-auto md:gap-4 pb-5">
              {plans.map(plan => <Plans key={plan.id} plan={plan} handlePlanSelect={handleSelect} submitPlan={submitPlan} />)}
            </div>
          </div>
        </>}

      {screen === 3 &&
        <>
          <div className="w-11/12 mx-auto my-5">
            {loading && <Loading/>}
          <div onClick={() => setScreen(2)} className="w-fit pt-2 mr-auto  mt-2 cursor-pointer">
          <FaChevronLeft className='text-2xl '/>
          </div>
            <h1 className='text-2xl mt-5 font-bold main text-center underline'>Order Summary</h1>
            <div className="w-3/4 mx-auto h-[20rem] flex items-start mt-5 ">
              <div className=" w-full flex h-full items-center flex-col gap-5 mainbg justify-center rounded-xl text-white">
                <div className="w-6/12 flex items-center justify-between">
                  <p>Title</p>
                  <p>{selectedPlan.title}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>Amount</p>
                  <p>{formatter.format(selectedPlan.amount)}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>Duration</p>
                  <p>{selectedPlan.duration}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>Max. Deposit</p>
                  <p>{formatter.format(selectedPlan.max_deposit)}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>Min. Withdrawal</p>
                  <p>{formatter.format(selectedPlan.min_with)}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>ROI</p>
                  <p>{selectedPlan.roi}</p>
                </div>
                <div className="w-6/12  flex items-center justify-between">
                  <p>Returns Capital</p>
                  <p>{selectedPlan.returns_cap}</p>
                </div>

              </div>

            </div>
            <div className="w-fit  mt-4 ml-auto ">
              <button onClick={purchasePlan} className='px-8 py-2 rounded-full mainbg text-white'>Confirm Purchase</button>
            </div>
          </div>
        </>
      }
    </div>

  )
}

export default Investments



{/* <h1 className='main  text-2xl text-center py-5  font-bold'>Select the Perfect Plan to Elevate Your Financial Journey!</h1>
<div className="md:grid md:grid-cols-3 flex flex-col gap-8 w-11/12 mx-auto md:gap-4 pb-5">
  <div class="w-full h-fit max-w-sm p-4 bg-white border capitalize border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <ul role="list" class="space-y-5 my-2" >
      <h5 class="mb-4 text-xl dark:text-gray-400 text-[#6b1b91] font-bold">{bronzeplan.title}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-4xl font-extrabold tracking-tight ">{formatter.format(bronzeplan.amount)}</span>
      </div>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">max deposit</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(bronzeplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">min withdrawal</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(bronzeplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">duration</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{bronzeplan.duration}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">ROI</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{bronzeplan.roi}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Returns Capital</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3 line-through">{bronzeplan.return_cap}</span>
      </li>
    </ul>
    <button type="button" onClick={submitPlan} onMouseOver={() =>handleBronzeSelect(bronzeplan)} class="  capitalize text-white  hover:mainbg focus:ring-4 focus:outline-none  bg-[#6b1b91]  font-medium mt-3 rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
  </div>
  <div class="w-full h-fit max-w-sm p-4 bg-white border capitalize border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <ul role="list" class="space-y-5 my-2" >
      <h5 class="mb-4 text-xl dark:text-gray-400 text-[#6b1b91] font-bold">{silverplan.title}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-4xl font-extrabold tracking-tight ">{formatter.format(silverplan.amount)}</span>
      </div>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">max deposit</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(silverplan.max_depo)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">min withdrawal</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(silverplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">duration</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{silverplan.duration}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">ROI</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{silverplan.roi}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Returns Capital</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3 line-through">{silverplan.return_cap}</span>
      </li>
    </ul>
    <button type="button" onMouseOver={() =>handleSilverSelect(silverplan)} class="text-white  hover:mainbg focus:ring-4 focus:outline-none  bg-[#6b1b91] font-medium rounded-lg mt-3 text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
  </div>

  <div class="w-full h-fit max-w-sm p-4 bg-white border capitalize border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <ul role="list" class="space-y-5 my-2" >
      <h5 class="mb-4 text-xl dark:text-gray-400 text-[#6b1b91] font-bold">{goldplan.title}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-4xl font-extrabold tracking-tight ">{formatter.format(goldplan.amount)}</span>
      </div>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">max deposit</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(goldplan.max_depo)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">min withdrawal</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(goldplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">duration</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{goldplan.duration}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">ROI</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{goldplan.roi}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Returns Capital</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3 line-through">{goldplan.return_cap}</span>
      </li>
    </ul>
    <button type="button" onMouseOver={() =>handleGoldSelect(goldplan)} class="text-white  hover:mainbg focus:ring-4 focus:outline-none mt-3 bg-[#6b1b91]  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
  </div>


  <div class="w-full h-fit max-w-sm p-4 bg-white capitalize border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <ul role="list" class="space-y-5 my-2" >
      <h5 class="mb-4 text-xl dark:text-gray-400 text-[#6b1b91] font-bold">{platinumplan.title}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-4xl font-extrabold tracking-tight ">{formatter.format(platinumplan.amount)}</span>
      </div>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">max deposit</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(platinumplan.max_depo)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">min withdrawal</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(platinumplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">duration</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{platinumplan.duration}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">ROI</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{platinumplan.roi}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Returns Capital</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3 ">{platinumplan.return_cap}</span>
      </li>
    </ul>
    <button type="button" onMouseOver={() =>handlePlatinumSelect(platinumplan)} class="text-white  hover:mainbg focus:ring-4 focus:outline-none mt-3 bg-[#6b1b91]  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>


    
  </div> <div class="w-full h-fit max-w-sm p-4 capitalize bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <ul role="list" class="space-y-5 my-2" >
      <h5 class="mb-4 text-xl dark:text-gray-400 text-[#6b1b91] font-bold">{diamondplan.title}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-4xl font-extrabold tracking-tight ">{formatter.format(diamondplan.amount)}</span>
      </div>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">max deposit</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(diamondplan.max_depo)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">min withdrawal</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{formatter.format(diamondplan.min_with)}</span>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">duration</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{diamondplan.duration}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">ROI</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{diamondplan.roi}</span>
      </li>
      <li class="w-full  flex items-center justify-between">
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Returns Capital</span>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3 ">{diamondplan.return_cap}</span>
      </li>
    </ul>
    <button type="button" onMouseOver={() =>handleDiamondSelect(diamondplan)} class="text-white  hover:mainbg focus:ring-4 focus:outline-none mt-3 bg-[#6b1b91]  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
  </div>
</div> */}