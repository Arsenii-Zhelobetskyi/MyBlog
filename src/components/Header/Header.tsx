import Navigation from '@/components/Header/Navigation';
import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCreatePost } from '@/components/Editor/useCreatePost';
import { useUpdatePost } from '@/components/Editor/useUpdatePost';
import postStore from '@/store/postStore.js';
function Header() {
  const { user, avatar } = useUser();
  const { createPost, isCreating } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const currentPosition = pathname.split('/').filter(Boolean).join('/');

  const id = postStore((state) => state.id);
  const title = postStore((state) => state.title);
  const content = postStore((state) => state.content);
  const cover = postStore((state) => state.cover);

  function handleCreate() {
    if (currentPosition !== 'editor') {
      navigate('/editor');
      return;
    }

    if (id) {
      updatePost({ id, title, content, cover, created_by: user?.user.id });
    } else {
      createPost({ title, content, cover, created_by: user?.user.id });
    }
  }
  return (
    <header className="fixed left-0 right-0 z-50 px-8 py-2 backdrop-blur-sm">
      {/* LOGO  */}
      <div className="mx-auto flex max-w-7xl justify-between">
        <Navigation />
        <div className="flex gap-2">
          {user?.isAuthenticated ? (
            <>
              <Button
                className="mr-2"
                disabled={
                  (Number(content?.content.length) === 1 ||
                    !title ||
                    isCreating) &&
                  currentPosition === 'editor'
                }
                onClick={handleCreate}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {currentPosition === 'editor' ? ( id? 'Update':'Post') : 'Create'}
              </Button>
              <Avatar
                className="hover:cursor-pointer"
                onClick={() => navigate('/my-profile')}
              >
                <AvatarImage src={avatar.avatarImage} alt="avatar" />
                <AvatarFallback>{avatar.initials}</AvatarFallback>
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
