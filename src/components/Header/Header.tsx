import Navigation from '@/components/Header/Navigation';
import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { user, avatar } = useUser();
  // const { avatar, isAuthenticated } = useGetUser();
  return (
    <header className="px-8 py-2 fixed right-0 left-0 backdrop-blur-sm z-50">
      {/* LOGO  */}
      <div className="mx-auto flex max-w-7xl justify-between">
        <Navigation />
        <div className="flex gap-2">
          {user?.isAuthenticated ? (
            <Avatar
              className="hover:cursor-pointer"
              onClick={() => navigate('/my-profile')}
            >
              <AvatarImage src={avatar.avatarImage} alt="avatar" />
              <AvatarFallback>{avatar.initials}</AvatarFallback>
            </Avatar>
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
