import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Memorial from "./pages/Memorial";
import Cemetery from "./pages/Cemetery";
import PageLayout from "./layout/PageLayout";
import CreateMemorialSearch from "./components/CreateMemorialSearch";
import TranscribeSearch from "./components/TranscribeSearch";
import AddMemorialPage from "./components/Memorial/AddMemorialPage";
import MemorialDetails from "./pages/MemorialDetails";
import AddCemetery from "./pages/AddCemetery";
import Profile from "./pages/Profile";
import CreateJourney from "./components/CreateJourney/CreateJourney";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/memorial" element={<Memorial />} />
        <Route path="/memorial/create" element={<AddMemorialPage />} />
        <Route path="/memorial/:id" element={<MemorialDetails />} />
        <Route path="/cemetery" element={<Cemetery />} />
        <Route path="/cemetery/create" element={<AddCemetery />} />
        <Route
          path="/memorial/create/search-cemetery"
          element={<CreateMemorialSearch />}
        />

        <Route
          path="/transcribe/create/search-cemetery"
          element={<TranscribeSearch />}
        />

        <Route path="/add/new-born" element={<CreateJourney type="newBorn" />} />
        <Route path="/add/living-profile" element={<CreateJourney type="livingProfile" />} />
        <Route path="/add/memorial" element={<CreateJourney type="memorial" />} />
      </Route>
    </Routes>
  );
}

export default App;
