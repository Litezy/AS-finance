// import moment from 'moment'
// import React, { useEffect, useRef } from 'react'

// const Notify = ({ selectedNotification,modal,notifyModal }) => {

//      const refdiv = useRef(null)
//     useEffect(()=>{
//         if(notifyModal){
//             window.addEventListener('click', (e)=>{
//                 if(refdiv.current !== null){
//                     if(refdiv.current.contains(e.target)){
//                         console.log('current')
//                         modal(true)
//                     }else{
//                         modal(false)
//                     }
//                 }
//             },true)
//         }
//     },[])
    
//     return (
//         <div className='overflow-hidden top-0 left- w-full h-[10rem] flex items-center justify-center bg-black/10'>
//             <div ref={refdiv} className="w-[50%] h-fit py-5 bg-white rounded-md">
//                 <div  className="w-11/12 mx-auto h-full">
//                     <div className="h-full">
//                         <p>{selectedNotification.type}</p>
//                         <p>{moment(selectedNotification.createdAt).format('DD MMMM YYYY hh:mm A')}</p>
//                         <p>{selectedNotification.message}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Notify