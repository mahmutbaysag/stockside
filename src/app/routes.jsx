import AuthGuard from "app/auth/AuthGuard";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import HomePage from "components/page/HomePage";

import WorkerRouteList from "components/worker/WorkerRouteList";
import companyProductRoute from "components/page/company/CompanyRouteList";
import UserRouteLİst from "components/page/user/UserRouteList";
import sessionRoutes from "components/page/SessionRoutes";
import dashboardRoutes from "components/dashboard/DashboardRoutes";
import NotFound from "components/page/NotFound";

import AdminRouteList from "components/admin/AdminRouteList";
const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...WorkerRouteList,
      ...companyProductRoute,
      ...UserRouteLİst,
      ...AdminRouteList,
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
