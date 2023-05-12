import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Dashboard = Loadable(lazy(() => import('./Dashboard')));
const Analytics = Loadable(lazy(() => import('./Analytics')));
const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
];

export default dashboardRoutes;
