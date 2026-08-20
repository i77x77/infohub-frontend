import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main">
      {/* Здесь можно написать общее меню навигации */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
