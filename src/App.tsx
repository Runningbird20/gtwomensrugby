import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Alumni from './pages/Alumni'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/alumni" element={<Alumni />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
