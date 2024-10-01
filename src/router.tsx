import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/components/ui/AppLayout';

import Home from '@/pages/Home';
import Post from '@/pages/Post';
import Editor from '@/pages/Editor';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MyProfile from '@/pages/MyProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/post/:id',
        element: <Post />,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
  
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/my-profile',
        element: <MyProfile/>,
      },
    ],
  },
]);

export default router;
