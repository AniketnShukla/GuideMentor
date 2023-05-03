import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuotePage from './components/QuotePage/QuotePage'
import AddQuote from './components/AddQuote/AddQuote'
import Error404 from './components/Error404'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={ store }>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/default" element={<QuotePage />} />
          <Route exact path="/add" element={<AddQuote />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
      </Provider>
  // </React.StrictMode>,
)
