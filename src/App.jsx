import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import Documents from "./pages/Documents.jsx";
import NotFound from "./pages/NotFound.jsx";

// Корневой компонент: описывает роутинг приложения.
// MainLayout — общая обёртка (например, навигация) для вложенных страниц,
// "*" — заглушка для несуществующих путей (404).
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="documents" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
