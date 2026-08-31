import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventCardPage from "./pages/EventCardPage";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<EventsPage />} />
          <Route
            path="events/:id"
            element={
              <ErrorBoundary>
                <EventCardPage />
              </ErrorBoundary>
            }
          />
          <Route path="documents" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;