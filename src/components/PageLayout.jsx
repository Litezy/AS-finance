import React from 'react'
import HeaderNav from './HeaderNav'
import Footer from './Footer'

const PageLayout = ({children}) => {
  return (
    <div>
       <div className="h-[10vh] -mb-1">
       <HeaderNav/>
       </div>
       <div className="h-[85vh]  overflow-x-auto">
       {children}
       </div>
       <div className="h-[5vh] -mt-1 bg-[#edfd93]">
       <Footer/>
       </div>
    </div>
  )
}

export default PageLayout