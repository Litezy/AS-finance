import React from 'react'
import HeaderNav from './HeaderNav'
import Footer from './Footer'

const PageLayout = ({children}) => {
  return (
    <div>
       <div className="h-[10vh]">
       <HeaderNav/>
       </div>
       <div className="h-fit  mb-5 ">
       {children}
       </div>
       <div className="h-[5vh] bg-[#edfd93]">
       <Footer/>
       </div>
    </div>
  )
}

export default PageLayout