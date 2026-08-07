import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Schedule', to: '/schedule' },
]

const alumniSubItems = [
  { label: '20th Anniversary', to: '/alumni/20th-anniversary' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // Past the opening photo section (roughly half a viewport tall).
        setScrolled(window.scrollY > window.innerHeight * 0.5)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header className={scrolled ? 'site-header site-header--scrolled' : 'site-header'}>
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand">
          <span className="site-header__brand-primary">
            <img className="site-header__brand-gt-mark" src="/gt-logo.png" alt="" />
            <span className="site-header__brand-text">Women's Rugby Club</span>
          </span>
          <img className="site-header__brand-logo" src="/logo-bee.png" alt="" />
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

          <div className="site-nav__dropdown">
            <NavLink
              to="/alumni"
              end
              className={({ isActive }) =>
                isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
              }
            >
              Alumni
            </NavLink>
            <ul className="site-nav__dropdown-menu">
              {alumniSubItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? 'site-nav__dropdown-link site-nav__dropdown-link--active'
                        : 'site-nav__dropdown-link'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <Link className="site-nav__cta" to="/contact">
            Join the Team
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
