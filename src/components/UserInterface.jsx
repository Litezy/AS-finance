import React from 'react'
import SearchBar from './SearchBar'
import Profile from './Profile'
import Presentations from './Presentations'
import PlayerDevices from './PlayerDevices'
import Dashboard from '../pages/Admin/Home'

const Userinterface = () => {
  return (
   
      <div className="w-full overflow-hidden">
        <SearchBar />
        <div className="mt-5">
          <Profile />
        </div>
        <div className="mt-5 flex items-start gap-8 w-full overflow-hidden">
          <Presentations />
          <PlayerDevices/>
        </div>
      </div>
      
  )
}

export default Userinterface