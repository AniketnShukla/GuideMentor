import React, { useEffect } from 'react'
import './Start.css'
import { Link } from 'react-router-dom'
const Start = () => {
    
useEffect(()=>{
},[])
  return (
    <div className='startPage'>
        <section class="start">
            {/* <p class="start_header">HeadStache</p> */}
            <p class="start_header">Mentor</p>
            <p class="small_header">Be the hand you seek for help.</p>
            <h1 class="btn-group">
                <Link to="/signup" class="btn">Signup</Link>
                <Link to="/login" class="btn">Login</Link>
            </h1>
            {/* <Link to="#" class="btn">get me out of here</Link> */}
        </section>
    </div>
  )
}

export default Start