import { NavLink } from 'react-router-dom'
import './Header.css'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'Alumni', to: '/alumni' },
]

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand">
          GT Women's Rugby
        </NavLink>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
