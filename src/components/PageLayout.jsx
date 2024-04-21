import React from 'react'
import HeaderNav from './HeaderNav'
import Footer from './Footer'

const PageLayout = ({children, ...props}) => {
  return (
    <div>
       <div className="h-[10vh] mb-1">
       <HeaderNav className=""/>
       
       </div>
       <div {...props} className="">
       {children}
       </div>
       <div className="h-fit py-20 bg-[#430a5d] z-auto">
       <Footer/>
       </div>
    </div>
  )
}

export default PageLayout