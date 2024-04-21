import React from 'react'
import { RxSwitch } from "react-icons/rx";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


const PlayerDevices = () => {
  return (
    <div className='w-3/4 bg-white rounded-xl py-5'>
      <div className="flex items-start w-11/12 mx-auto justify-between mt-5">
        <h1 className='w-2/4 font-bold text-2xl'>Player Devices</h1>
        <input type="text" placeholder='search' className='w-2/4 h-10 mr-4 outline-none border pl-3 rounded-lg' />
        <RxSwitch className='text-4xl text-[#059c1a] cursor-pointer' />
      </div>
      <div className="mt-10 w-full">
        <table className='w-11/12 mx-auto  '>
          <tr className='font-bold bg-[#fafafa] h-10  py-2 text-center rounded-md  '>
            <th >Player Name</th>
            <th>Last Update</th>
            <th>Last Ping Status</th>
            <th>License Status</th>
          </tr>
          <tr className='text-sm text-center mt-5 border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>RosePc</p>
              <p className='text-[11px] text-[#dce1e8]'>India</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>OFF</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ACTIVE</div>
            </td>
          </tr>
          <tr className='text-sm text-center  border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>MariaPc</p>
              <p className='text-[11px] text-[#dce1e8]'>Armenia</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ON</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>INACTIVE</div>
            </td>
          </tr>
          <tr className='text-sm text-center  border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>MiraclePc</p>
              <p className='text-[11px] text-[#dce1e8]'>USA</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ON</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>INACTIVE</div>
            </td>
          </tr>
          <tr className='text-sm text-center  border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>JohnPc</p>
              <p className='text-[11px] text-[#dce1e8]'>Scotland</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ON</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ACTIVE</div>
            </td>
          </tr>
          <tr className='text-sm text-center  border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>MikePc</p>
              <p className='text-[11px] text-[#dce1e8]'>Germany</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>OFF</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>INACTIVE</div>
            </td>
          </tr>
          <tr className='text-sm text-center  border-b h-14'>
            <td className='text-[16px]'>
              <p className='font-bold'>PascalPc</p>
              <p className='text-[11px] text-[#dce1e8]'>Sydney</p>
            </td>
            <td className='text-[13px] '>
              <p>31/12/2022</p>
              <p className='text-[11px] text-[#dce1e8]'>21/02/2021</p>
            </td>
            <td className=''>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#f19b9d] bg-[#ffeeed]'>OFF</div>
            </td>
            <td>
              <div className='w-3/4 mx-auto rounded-full  py-2 font-bold text-[#89d8b1] bg-[#e7f7ef]'>ACTIVE</div>
            </td>
          </tr>
        </table>
        <div className="w-11/12 mx-auto mt-10 flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/2  justify-between">
            <IoChevronBackOutline className='border cursor-pointer' />
            <button className="px-1 border py-0 bg-[#e7f7ef]">1</button>
            <button className="">2</button>
            <button className="">3</button>
            <button className="">....</button>
            <button className="">10</button>
            <IoChevronForwardOutline className='border cursor-pointer' />
          </div>
          <div className="">
            <p>Showing 1 to 6 of 50 entries</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDevices