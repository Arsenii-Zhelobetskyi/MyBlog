import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/components/ui/AppLayout';

import Home from '@/pages/Home';
import Post from  '@/pages/Post';
import Editor from '@/pages/Editor';

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
        element: <Post/>,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
    ],
  },
]);

export default router;
