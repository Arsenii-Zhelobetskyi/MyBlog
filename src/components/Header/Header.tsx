import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Header/Navigation';
import { Button } from '@/components/ui/button';
import { useGetUser } from '@/components/SignIn/useUser';
function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useGetUser();
  return (
    <header className="px-8 py-5">
      {/* LOGO  */}
      <div className="mx-auto flex max-w-7xl justify-between">
        <Navigation />
        <div className="flex gap-2">
          {isAuthenticated || (
            <>
              <Button onClick={() => navigate('/sign-in')} variant="link">
                Sign in
              </Button>
              <Button onClick={() => navigate('/sign-up')}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
