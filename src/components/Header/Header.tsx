import Navigation from '@/components/Header/Navigation';

import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import CreateButton from '@/components/Header/CreateButton';
import { makeInitials } from '@/lib/utils';
import { ModeToggle } from './ModeToggle';
function Header() {
  const { user, isPending } = useUser();
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 right-0 z-50 px-8 py-2 backdrop-blur-sm">
      {/* LOGO  */}
      <div className="mx-auto flex max-w-7xl justify-between">
        <Navigation />

        <div className="flex gap-2">
          <ModeToggle/>
          {user?.isAuthenticated && !isPending ? (
            <>
              <CreateButton />
              <Avatar
                className="hover:cursor-pointer"
                onClick={() => navigate('/my-profile')}
              >
                <AvatarImage src={user.user.avatar} alt="avatar" />
                <AvatarFallback>
                  {makeInitials(user.user.firstName, user.user.lastName)}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
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
