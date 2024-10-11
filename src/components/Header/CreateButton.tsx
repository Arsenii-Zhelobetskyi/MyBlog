import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import postStore from '@/store/postStore.js';

import { useCreatePost } from '@/components/Editor/useCreatePost';
import { useUpdatePost } from '@/components/Editor/useUpdatePost';
import { useUser } from '@/components/SignIn/useUser';

import { useLocation, useNavigate } from 'react-router-dom';
function CreateButton() {
  const { createPost, isCreating } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();

  const id = postStore((state) => state.id);
  const editor = postStore((state) => state.editor);
  const title = postStore((state) => state.title);
  const cover = postStore((state) => state.cover);
  const isContentDirty = postStore((state) => state.isContentDirty);
  const reset = postStore((state) => state.reset);



  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const currentPosition = pathname.split('/').filter(Boolean).join('/');


  const { user} = useUser();


  function handleCreate() {
    if (currentPosition !== 'editor') {
      navigate('/editor');
      return;
    }

    if (id) {
      updatePost({
        id,
        title,
        content: editor.getJSON(),
        cover,
        created_by: user?.user.id,
      });
    } else {
      createPost({
        title,
        content: editor.getJSON(),
        cover,
        created_by: user?.user.id,
      });
    }
    reset();
    editor.commands.clearContent();
  }
  return (
    <Button
      className="mr-2"
      disabled={
        (!isContentDirty || !title || isCreating || isUpdating) &&
        currentPosition === 'editor'
      }
      onClick={handleCreate}
    >
      <Pencil className="mr-2 h-4 w-4" />
      {currentPosition === 'editor' ? (id ? 'Update' : 'Post') : 'Create'}
    </Button>
  );
}

export default CreateButton;
