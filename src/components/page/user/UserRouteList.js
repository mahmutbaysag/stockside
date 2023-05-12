import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const UserProfile = Loadable(lazy(() => import('./UserProfile')));
const UserInventory = Loadable(lazy(() => import('./UserInventory')));
const UserCollectiveInventoryAdd = Loadable(lazy(() => import('./UserCollectiveInventoryAdd')));

const companyProductRoute = [
    {
        path: '/user/profile/:id',
        element: <UserProfile />,
    },
    {
        path: '/user/inventory/:id',
        element: <UserInventory />,
    },
    {
        path: '/user/collectiveinventoryadd/:id',
        element: <UserCollectiveInventoryAdd />,
    },
];

export default companyProductRoute;
