import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MapProvider } from "react-map-gl/maplibre";
import { ThemeProvider } from "./components/theme-provider";
import { DataProvider } from "./contexts/DataContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Submission";
import DataManager from "./pages/DataManager";
import { LoginProvider } from "./contexts/LoginContext";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LoginProvider>
          <DataProvider>
            <MapProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<DataManager />} />
                </Route>
                <Route path="/pengajuan" element={<Submission />} />
              </Routes>
              <Toaster />
            </MapProvider>
          </DataProvider>
        </LoginProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
