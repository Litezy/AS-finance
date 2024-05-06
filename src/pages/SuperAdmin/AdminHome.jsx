import React, { useCallback, useEffect, useState } from 'react'
import { errorMessage, formatter } from '../../components/utils/UtilNames'
import Summary from '../admincomponents/Summary'
import { Apis, ClientGetApi, GetApi } from '../../services/Apis'

const AdminHome = () => {

  const [users, setUsers] = useState([])
  const [deposits, setDeposits] = useState([])
  const [withdraws, setWithdraws] = useState([])
  const [plans, setPlans] = useState([])
  const [kycs, setKycs] = useState([])

  const  fetchAllUsers = useCallback( async () =>{
    try {
      const response = await GetApi(Apis.admins.all_users)
      if(response.status === 200){
        setUsers(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  },[])
  const  fetchAllDeposits = useCallback( async () =>{
    try {
      const response = await GetApi(Apis.admins.all_deposits)
      if(response.status === 200){
        setDeposits(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  },[])
  const  fetchAllWithdrawals = useCallback( async () =>{
    try {
      const response = await GetApi(Apis.admins.all_withdrawals)
      if(response.status === 200){
        setWithdraws(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  },[])
  const  fetchAllKYCs = useCallback( async () =>{
    try {
      const response = await GetApi(Apis.admins.all_kycs)
      if(response.status === 200){
        setKycs(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  },[])
  const  fetchActivePlans = useCallback( async () =>{
    try {
      const response = await GetApi(Apis.admins.all_plans)
      if(response.status === 200){
        setPlans(response.data)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  },[])

  useEffect(() =>{
  fetchAllUsers()
  fetchAllDeposits()
  fetchAllWithdrawals()
  fetchActivePlans()
  fetchAllKYCs()
  },[])
  return (
    <div className='mt-20 md:mt-5 w-11/12 mx-auto h-fit pb-20  '>
       <div className="md:grid block md:grid-cols-4 md:w-full w-3/4 mx-auto gap-3 md:h-40">
       <Summary data={users.length} text={'text-white'} color='bg-black' title={'Total Users'}/>
        <Summary data={formatter.format(deposits)} text={'text-white'} color='bg-green-500' title={'Total Deposits'}/>
        <Summary data={formatter.format(withdraws)} text={'text-white'} color='bg-red-500' title={'Total Withdrawals'}/>
        <Summary data={7} text={'text-white'} color='bg-orange-500' title={'Total Plans'}/>
       </div>
       <div className="md:grid md:grid-cols-4 md:w-full block  w-3/4 mx-auto gap-3 md:h-40 md:mt-10">
        <Summary data={plans.length} text='text-white' color='bg-gray-500' title={'Active Plans'}/>
        <Summary data={kycs.length} text={'text-white'} color='bg-teal-500' title={"KYC'ed Users"}/>
        {/* <Summary data={3000} text={'text-white'} color='bg-yellow-500' title={'Total Users'}/>
        <Summary data={3000} text={'text-white'} color='bg-blue-500' title={'All Plans'}/> */}
       </div>
    </div>
  )
}

export default AdminHome