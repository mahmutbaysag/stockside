import React from "react";
import useAuth from "app/hooks/useAuth";
import AdminDashbord from "./AdminDashbord";
import BossDashbord from "./BossDashbord";
import WorkerDashbord from "./WorkerDashbord";

const Dashbord = () => {
  const { user } = useAuth();
  return user.user_level == 0 ? (
    <AdminDashbord />
  ) : user.user_level == 1 ? (
    <BossDashbord />
  ) : user.user_level == 2 ? (
    <WorkerDashbord />
  ) : (
    <div>Not Found</div>
  );
};

export default Dashbord;
