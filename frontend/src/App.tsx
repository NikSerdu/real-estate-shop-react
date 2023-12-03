import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./components/screens/CreatePage";
import FavouritesPage from "./components/screens/FavouritesPage";
import HomePage from "./components/screens/HomePage";
import PropertiesPage from "./components/screens/PropertiesPage";
import PropertyPage from "./components/screens/PropertyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:type/:id" element={<PropertyPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

export default App;
