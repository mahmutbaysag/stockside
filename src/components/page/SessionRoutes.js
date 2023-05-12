import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const Login = Loadable(lazy(() => import('./Login')));
const Register = Loadable(lazy(() => import('./Register')));
const PaymentPage = Loadable(lazy(() => import('./PaymentPage')));
const WorkerRegisterPage = Loadable(lazy(() => import('./WorkerRegisterPage')));
const sessionRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/payment', element: <PaymentPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '/workerregister/:code', element: <WorkerRegisterPage /> },
];

export default sessionRoutes;
