import { HashRouter, Route, Routes } from "react-router-dom";
import { MapProvider } from "react-map-gl/maplibre";
import { ThemeProvider } from "./components/theme-provider";
import { DataContext } from "./contexts/DataContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Submission";
import DataManager from "./pages/DataManager";

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <DataContext>
          <MapProvider>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pengajuan" element={<Submission />} />
              <Route path="/admin" element={<DataManager />} />
            </Routes>
          </MapProvider>
        </DataContext>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
