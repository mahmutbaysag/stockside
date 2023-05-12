import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const WorkerList = Loadable(lazy(() => import('./List')));
const WorkerAdd = Loadable(lazy(() => import('./Add')));

const materialRoutes = [
    {
        path: '/worker/list',
        element: <WorkerList />,
        auth: ["1", "2"],
    },
    {
        path: '/worker/add',
        element: <WorkerAdd />,
        auth: ["1", "2"],
    },
];

export default materialRoutes;
