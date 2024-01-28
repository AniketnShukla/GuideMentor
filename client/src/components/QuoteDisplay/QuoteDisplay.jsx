import React from 'react'
import { useSelector } from 'react-redux'
import './../../Home.css'

const QuoteDisplay = () => {
  const author = useSelector((state)=> state.quote.author)
  const quote = useSelector((state) => state.quote.quote)  
  return (
    <div className='emotion-text'>
        <h3>{ quote }</h3>
        <h4>{ author }</h4>
    </div>  
    )
}

export default QuoteDisplay