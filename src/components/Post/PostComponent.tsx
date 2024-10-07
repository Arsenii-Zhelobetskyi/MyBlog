import { usePost } from '@/components/Post/usePost';
import Spinner from '@/components/ui/Spinner';
import { TypographyH1 } from '@/components/ui/TypographyH1';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { useUser } from '@/components/SignIn/useUser';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Underline from '@tiptap/extension-underline';
import { NotebookPen, Siren, Trash2 } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import postStore from '@/store/postStore.ts';
const extensions = [StarterKit, Underline];

function PostComponent() {
  const { isPending, post } = usePost();
  const [html, setHtml] = useState('');
  const navigate = useNavigate();
  const cover = postStore((state) => state.cover);
  const setId = postStore((state) => state.setId);
  const setCover = postStore((state) => state.setCover);
  const setTitle = postStore((state) => state.setTitle);
  const setContent = postStore((state) => state.setContent);
  const { user } = useUser();

  useEffect(() => {
    if (post) {
      setHtml(generateHTML(post.content, extensions));
    }
  }, [post]);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  function handleEdit() {
    setId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCover(post.cover === null ? '' : post.cover);
    navigate('/editor');
  }
  function handleDecline() {}

  return (
    <div className="flex flex-col gap-11">
      {post.cover && (
        <div className="absolute inset-0 top-20 -z-10">
          <img
            className="max-h-80 w-full object-cover"
            src={post.cover}
            alt="cover"
          />
        </div>
      )}
      <div className={`${post.cover ? 'mt-80' : ''}`}>
        <div
          className={`${user?.user.id === post.created_by || user?.isAdmin ? '' : 'hidden'} flex gap-2`}
        >
          <Button variant="ghost" onClick={handleDecline}>
            <Siren className="mr-2 h-4 w-4" />
            Decline this post
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <NotebookPen className="mr-2 h-4 w-4" />
            Edit this post
          </Button>
          <Button variant="ghost">
            <Trash2 className="mr-2 h-4 w-4" />
            delete this post
          </Button>
        </div>
        <TypographyH1>{post.title}</TypographyH1>
      </div>
      <div>
        <div
          className={cn(
            'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export default PostComponent;
