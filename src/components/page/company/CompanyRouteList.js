import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const CompanyProduct = Loadable(lazy(() => import('./Product')));
const CompanyDetail = Loadable(lazy(() => import('./Detail')));
const companyProductRoute = [
    {
        path: '/company/product',
        element: <CompanyProduct />,
    },
    {
        path: '/company/detail',
        element: <CompanyDetail />,
    },
];

export default companyProductRoute;
