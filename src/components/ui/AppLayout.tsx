import Header from '@/components/Header/Header';
import { useUser } from '@/components/SignIn/useUser';
import Spinner from '@/components/ui/Spinner';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AppLayout() {
  const { isPending, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    const restrictedRegisteredPaths = ['sign-in', 'sign-up'];
    const restrictedUnRegisteredPaths = ['my-profile'];
    const childPath = pathname.split('/').filter(Boolean).join('/');

    if (
      user?.isAuthenticated===true &&
      restrictedRegisteredPaths.includes(childPath)
    ) {
      navigate('/');
    }

    if (
      user?.isAuthenticated ===false &&
      restrictedUnRegisteredPaths.includes(childPath)
    ) {
      navigate('/');
    }
  }, [pathname, user, navigate]);

  if (isPending || user?.isAuthenticated === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div id='app' className="flex min-h-screen flex-col ">
      <Header />
      <div className="mt-20 flex-1 px-8 py-12">
        <main className="mx-auto ">
          
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}

export default AppLayout;
