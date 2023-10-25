// vendors
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../config/firebase"
// context
import { useUserContext } from "../context/UserContext"

export const Navbar = () => {
  const { user } = useUserContext()

  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg bg-dark container-fluid">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-item nav-link text-light" to="/">Home</NavLink>
        {
          user ? (
            <>
              <NavLink className="navbar-brand nav-item nav-link text-light" to="/dashboard">Dashboard</NavLink>
              <button className="btn btn-light" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              {/* <NavLink className="navbar-brand nav-item nav-link text-light" to="/login">Login</NavLink> */}
              <button className="btn btn-light" onClick={() => navigate("/login")}>Login</button>
            </>
          )
        }
      </div>

    </nav>
  )
}
