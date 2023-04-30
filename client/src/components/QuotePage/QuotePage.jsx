import React from 'react'
import { useSelector } from 'react-redux'

const QuotePage = () => {
    const quote = useSelector((state)=> {
     return state.quote.quote
    })
  return (
    <div>
        <h1>{quote}</h1>
    </div>
  )
}

export default QuotePage