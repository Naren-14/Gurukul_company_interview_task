import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function NavPage(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = () => {
    localStorage.clear();
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="container__header">
      <section className="container__outer">
        <nav className="container__inner container__nav">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  [isActive && "active"].filter(Boolean).join(" ")
                }
                end
                to="/"
              >
                Users List
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  [isActive && "active"].filter(Boolean).join(" ")
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default NavPage;
