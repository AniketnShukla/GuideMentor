import React from 'react'
import { useSelector } from 'react-redux'
import './../../App.css'

const QuoteDisplay = () => {
  const author = useSelector((state)=> state.quoteReducer.author)
  const quote = useSelector((state) => state.quoteReducer.quote)  
  return (
    <div className='emotion-text'>
        <h3>{ quote }</h3>
        <h4>{ author }</h4>
    </div>  
    )
}

export default QuoteDisplay