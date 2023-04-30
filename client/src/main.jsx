import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuotePage from './components/QuotePage/QuotePage'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={ store }>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/default" element={<QuotePage />} />
        </Routes>
    </BrowserRouter>
      </Provider>
  // </React.StrictMode>,
)
