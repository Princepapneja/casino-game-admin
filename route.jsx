// import  {  Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './src/pages/dashboard';
import DashboardLayout from './src/layout/DashboardLayout';
import AddForm from './src/components/dashboard/AddForm';
import AllTables from './src/components/dashboard/AllTables';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';


const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {
                    path: '/',
                    element:<Login type={"login"}/>
                },
                {
                    path: '/forgot-password',
                    element: <Login type={"forgot pass"}/>
                },
                        {
                            path: '/dashboard',
                            element: <DashboardLayout />,
                            children:[
                                {
                                    path: '/dashboard',
                                    element:  <Dashboard />,
                                },
                                {
                                    path: '/dashboard/add-user',
                                    element: <AddForm text={"add new user"} type="user" />
                                },
                                {
                                    path: '/dashboard/manage-user',
                                    element: <AllTables type={"users"} />
                                },
                                {
                                    path: '/dashboard/profile',
                                    element: <AddForm text={"My profile"} type="profile"/>
                                },
                            ]
                        },
                
            ]
        },
       
       
        
    ]);

    return (
            <RouterProvider router={router} />
    );
}

export default Route;
