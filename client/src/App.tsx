import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import RegisterFarmerPage from './pages/RegisterPage/RegisterFarmerPage'
import RegisterFarmPage from "./pages/RegisterPage/RegisterFarmPage";
import RegisterHarvestPage from "./pages/RegisterPage/RegisterHarvestPage";
import RegisterCropPage from "./pages/RegisterPage/RegisterCropPage";
import Dashboard from "./pages/DashboardPage";
import ListFarmerPage from "./pages/ListPage/ListFarmerPage";
import ListFarmPage from "./pages/ListPage/ListFarmPage";
import ListHarvestPage from "./pages/ListPage/ListHarvestPage";
import ListCropPage from "./pages/ListPage/ListCropPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/farmer" element={<ListFarmerPage />} />
        <Route path="/farm" element={<ListFarmPage />} />
        <Route path="/harvest" element={<ListHarvestPage />} />
        <Route path="/crop" element={<ListCropPage />} />
        <Route path="/farmer/register" element={<RegisterFarmerPage />} />
        <Route path="/farm/register" element={<RegisterFarmPage />} />
        <Route path="/harvest/register" element={<RegisterHarvestPage />} />
        <Route path="/crop/register" element={<RegisterCropPage />} />
        <Route path="/farmer/edit/:id" element={<RegisterFarmerPage />} />
        <Route path="/farm/edit/:id" element={<RegisterFarmPage />} />
        <Route path="/harvest/edit/:id" element={<RegisterHarvestPage />} />
        <Route path="/crop/edit/:id" element={<RegisterCropPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
