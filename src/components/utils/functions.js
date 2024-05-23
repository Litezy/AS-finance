export const MoveToBottom = ()=>{
    const div = document.querySelector('.divs')
    if(div){
        div.scrollTo({
            top:div.scrollHeight,
            behavior:'smooth'
        })
    }
}
export const MoveToTop= () =>{
    const div = document.querySelector('.updiv')
    if(div){
        div.scrollTop =0
    }
}