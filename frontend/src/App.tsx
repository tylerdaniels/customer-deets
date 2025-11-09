import { Link, NavLink, Outlet } from "react-router-dom";

import "./App.scss";
import { useMemo } from "react";

type NavItem = {
  icon: string;
  text: string;
  href: string;
};

const NAVIGATION_ITEMS: NavItem[] = [
  // Dynamic lists can include checks for permissions and available feature flags
  { icon: "bi-person-circle", text: "Customers", href: "/" },
  { icon: "bi-info-circle", text: "About", href: "/about" },
];

function App() {
  const navItems = useMemo(
    () =>
      NAVIGATION_ITEMS.map((n) => (
        <li className="nav-item">
          <NavLink
            to={n.href}
            className={({ isActive }) =>
              "nav-link text-white" + (isActive ? " active" : "")
            }
          >
            <i className={"bi " + n.icon}></i>
            {n.text}
          </NavLink>
        </li>
      )),
    []
  );
  return (
    <>
      <main className="d-flex flex-nowrap vh-100">
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
          style={{ width: "280px" }}
        >
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">Customer Deets</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">{navItems}</ul>
        </div>
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
