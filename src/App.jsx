import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Memorial from "./pages/Memorial";
import Cemetery from "./pages/Cemetery";
import PageLayout from "./layout/PageLayout";

function App() {
  return (
    <BrowserRouter basename="/rise">
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/cemetery" element={<Cemetery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
