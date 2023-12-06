import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import CreatePage from "./components/screens/CreatePage";
import FavouritesPage from "./components/screens/FavouritesPage";
import HomePage from "./components/screens/HomePage";
import MyPropertiesPage from "./components/screens/MyProperties";
import PropertiesPage from "./components/screens/PropertiesPage";
import PropertyPage from "./components/screens/PropertyPage";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/my-properties" element={<MyPropertiesPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:type/:id" element={<PropertyPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

export default App;
