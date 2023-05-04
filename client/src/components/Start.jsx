import React, { useEffect } from 'react'
import './Start.css'
const Start = () => {
    
useEffect(()=>{
},[])
  return (
    <div className='startPage'>
        <section class="start">
            <p class="start_header">HeadStache</p>
            <h1 class="btn-group">
                <a href="/signup" class="btn">Signup</a>
                <a href="/login" class="btn">Login</a>
            </h1>
            {/* <a href="#" class="btn">get me out of here</a> */}
        </section>
    </div>
  )
}

export default Start