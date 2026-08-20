import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

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
