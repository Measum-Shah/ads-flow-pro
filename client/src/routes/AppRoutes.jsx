import { Route, Routes } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import { ROUTE_ACCESS } from "../utils/rolePermissions";

import Home from "../pages/public/Home";
import BrowseAds from "../pages/public/BrowseAds";
import AdDetails from "../pages/public/AdDetails";
import Packages from "../pages/public/Packages";
import About from "../pages/public/About";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import ClientDashboard from "../pages/client/ClientDashboard";
import MyAds from "../pages/client/MyAds";
import CreateAd from "../pages/client/CreateAd";
import EditAd from "../pages/client/EditAd";
import SelectPackage from "../pages/client/SelectPackage";
import SubmitPayment from "../pages/client/SubmitPayment";
import AdHistory from "../pages/client/AdHistory";

import ModeratorDashboard from "../pages/moderator/ModeratorDashboard";
import ReviewQueue from "../pages/moderator/ReviewQueue";
import ReviewAd from "../pages/moderator/ReviewAd";

import AdminDashboard from "../pages/admin/AdminDashboard";
import PaymentQueue from "../pages/admin/PaymentQueue";
import VerifyPayment from "../pages/admin/VerifyPayment";
import PublishAd from "../pages/admin/PublishAd";
import Analytics from "../pages/admin/Analytics";

import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/errors/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<BrowseAds />} />
        <Route path="/ads/:slug" element={<AdDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<RoleRoute allowedRoles={ROUTE_ACCESS.CLIENT} />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/ads" element={<MyAds />} />
            <Route path="/client/ads/create" element={<CreateAd />} />
            <Route path="/client/ads/:id/edit" element={<EditAd />} />
            <Route path="/client/ads/:id/package" element={<SelectPackage />} />
            <Route path="/client/ads/:id/payment" element={<SubmitPayment />} />
            <Route path="/client/ads/:id/history" element={<AdHistory />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={ROUTE_ACCESS.MODERATOR} />}>
            <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
            <Route path="/moderator/review-queue" element={<ReviewQueue />} />
            <Route path="/moderator/ads/:id/review" element={<ReviewAd />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={ROUTE_ACCESS.ADMIN} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/payment-queue" element={<PaymentQueue />} />
            <Route path="/admin/payments/:id/verify" element={<VerifyPayment />} />
            <Route path="/admin/ads/:id/publish" element={<PublishAd />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;