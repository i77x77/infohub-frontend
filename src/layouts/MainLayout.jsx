import { NavLink, Outlet } from "react-router-dom";
import "./MainLayout.css";

function menuItemClassName({ isActive }) {
  return isActive ? "top-menu__item top-menu__item--active" : "top-menu__item";
}

function MainLayout() {
  return (
    <div className="main">
      <nav className="top-menu">
        <NavLink to="/" end className={menuItemClassName}>
          Главная
        </NavLink>
        <NavLink to="/events" className={menuItemClassName}>
          Мероприятия
        </NavLink>
        <NavLink to="/documents" className={menuItemClassName}>
          Документы
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
