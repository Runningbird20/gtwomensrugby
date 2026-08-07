import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

const adminNavItems = [
  { label: 'Coaches', to: '/admin/coaches' },
  { label: 'Executive Board', to: '/admin/exec-board' },
  { label: 'Alumni', to: '/admin/alumni' },
  { label: 'Practice Schedule', to: '/admin/practices' },
  { label: 'Game Schedule', to: '/admin/games' },
  { label: 'Carousel Photos', to: '/admin/carousel' },
  { label: 'Site Text', to: '/admin/content' },
]

function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <p className="admin-layout__title">Admin</p>
        <nav className="admin-layout__nav">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'admin-layout__link admin-layout__link--active' : 'admin-layout__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="admin-layout__signout" onClick={() => signOut()}>
          Sign Out
        </button>
      </aside>

      <div className="admin-layout__content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
