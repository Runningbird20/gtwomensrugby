import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Alumni from './pages/Alumni'
import Anniversary from './pages/Anniversary'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminPeople from './pages/admin/AdminPeople'
import AdminAlumni from './pages/admin/AdminAlumni'
import AdminPractices from './pages/admin/AdminPractices'
import AdminGames from './pages/admin/AdminGames'
import AdminCarousel from './pages/admin/AdminCarousel'
import AdminContent from './pages/admin/AdminContent'
import './App.css'

function PublicSite() {
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
          <Route path="/alumni/20th-anniversary" element={<Anniversary />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminPeople key="coach" section="coach" title="Coaches" />} />
        <Route path="coaches" element={<AdminPeople key="coach" section="coach" title="Coaches" />} />
        <Route path="exec-board" element={<AdminPeople key="exec_board" section="exec_board" title="Executive Board" />} />
        <Route path="alumni" element={<AdminAlumni />} />
        <Route path="practices" element={<AdminPractices />} />
        <Route path="games" element={<AdminGames />} />
        <Route path="carousel" element={<AdminCarousel />} />
        <Route path="content" element={<AdminContent />} />
      </Route>
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}

export default App
