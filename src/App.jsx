import React, { Fragment } from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/General/Login'
import SignUp from './pages/General/SignUp'
import AdminPageLayout from './pages/Admin/AdminPageLayout'
import Settings from './pages/Admin/Settings'
import Home from './pages/Admin/Home'
import Deposit from './pages/Admin/Deposit'
import Investments from './pages/Admin/Investments'
import TransactionHistory from './pages/Admin/TransactionHistory'
import AdminProfile from './pages/Admin/AdminProfile'
import AuthRoutes from './services/AuthRoutes'
import Withdraws from './pages/Admin/Withdraws'
import Notifications from './pages/Admin/Notifications'
import AdminControl from './pages/SuperAdmin/AdminControl'
// import Notify from './components/Notify'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRoutes><HomePage /></AuthRoutes>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/settings' element={<AuthRoutes><Settings/></AuthRoutes>} />
        <Route path='/profile-user' element={<AuthRoutes><AdminProfile /></AuthRoutes>} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<AuthRoutes><AdminPageLayout /></AuthRoutes>} />
        <Route path='/deposit' element={<AuthRoutes><Deposit /></AuthRoutes>} />
        <Route path='/investment' element={<AuthRoutes><Investments /></AuthRoutes>} />
        <Route path='/withdraw' element={<AuthRoutes><Withdraws /></AuthRoutes>} />
        <Route path='/transaction' element={<AuthRoutes><TransactionHistory /></AuthRoutes>} />
        <Route path='/notifications' element={<AuthRoutes><Notifications /></AuthRoutes>} />
        <Route path='/admin' element={<AuthRoutes><AdminControl/></AuthRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App