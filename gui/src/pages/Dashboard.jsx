import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DashboardFrameDesktop from "../dashboard/desktop/DashboardFrameDesktop";
import DashboardFramePhone from "../dashboard/phone/DashboardFramePhone";

const Dashboard = () => {

  const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
  const nav = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {

    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      nav("/auth");
      return;
    }

    if (user && !user.isVerified) {
      nav("/auth?mode=verify");
      return;
    }

  }, [nav, isAuthenticated, isCheckingAuth, user]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  if (isCheckingAuth) return null;

  const Frame = DashboardFrameDesktop;

  return (
    <Frame>
      <Outlet />
    </Frame>
  );
};

export default Dashboard;