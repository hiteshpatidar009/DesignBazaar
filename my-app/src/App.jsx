import { Routes, Route } from "react-router-dom";
import Navbar from "./componet/navbar";
import Home from "./Home";
import Mainpage from "./componet/maincontain";
import ComponentBox from "./componet/ComponentBox";
import VenderRegister from "./vender/VenderRegister";
import UicomponentList from "./Uicomponent/uicomponentList";
import Category from "./admin/Category";
import VenderMgt from "./admin/VenderMgt";
import UIComponentCURDBy from "./Uicomponent/uicomponentcurdby";
import UIComponentCURDAdmin from "./admin/UIComponentCURDAdmin";
import Leaderboard from "./componet/Leaderboard";
import AboutUs from "./Aboutus";
import Footer from "./componet/Footer";
import VenderLogin from "./vender/VenderLogin";
import VenderDashboard from "./vender/VenderDashboard";
import ComponentReg from "./Uicomponent/uicomponentRegister";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/component-box" element={<ComponentBox />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<VenderRegister />} />
          <Route path="/components" element={<UicomponentList />} />
          <Route path="/category" element={<Category />} />
          <Route path="/vender-management" element={<VenderMgt />} />
          <Route path="/curd-by-dev" element={<UIComponentCURDBy />} />
          <Route path="/curd-admin" element={<UIComponentCURDAdmin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/vender/login" element={<VenderLogin />} />
          <Route path="/component-register" element={<ComponentReg />} />
          <Route path="/vender/dashboard" element={<VenderDashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
