import React from 'react'

import Navbar from './components/navbar'
import Menu from './components/menu'
import Routes from './routes'
import Footer from './components/footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Menu />
      <Footer />
    </div>
  )
}

export default App
