import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Message = Loadable(lazy(() => import('./Message')));
const Settings = Loadable(lazy(() => import('./Settings')));

const dashboardRoutes = [
    { path: '/message', element: <Message /> },
    { path: '/settings', element: <Settings /> },
];

export default dashboardRoutes;
