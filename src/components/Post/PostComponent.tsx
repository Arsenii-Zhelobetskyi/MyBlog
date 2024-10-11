import { usePost } from '@/components/Post/usePost';
import Spinner from '@/components/ui/Spinner';
import { TypographyH1 } from '@/components/ui/TypographyH1';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { useUser } from '@/components/SignIn/useUser';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Underline from '@tiptap/extension-underline';
import { AlertCircle, NotebookPen } from 'lucide-react';

import DeclinePost from '@/components/Post/DeclinePost';
import DeletePost from '@/components/Post/DeletePost';
import DeleteUser from '@/components/Post/DeleteUser';
import PublishPost from '@/components/Post/PublishPost';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { makeInitials } from '@/lib/utils';
import postStore from '@/store/postStore.ts';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLike } from '@/components/Post/useLike';

const extensions = [StarterKit, Underline];

function PostComponent() {
  const { isPending, post } = usePost();
  const { like } = useLike();
  const [html, setHtml] = useState('');
  const navigate = useNavigate();
  const setId = postStore((state) => state.setId);
  const setCover = postStore((state) => state.setCover);
  const setTitle = postStore((state) => state.setTitle);
  const setContent = postStore((state) => state.setContent);
  const { user } = useUser();
  const shouldLike = !post?.likesData?.some(like => like.user_id === user?.user.id);

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
  
  function handleLike() {
    if(!user?.isAuthenticated) return;
    like({ id: post.id, user_id: user?.user.id, likeQuantity: post.likes, shouldLike });
  }
  
  return (
    <div className="flex flex-col gap-11">
      {post.cover && (
        <div className="absolute inset-0 top-20 -z-10 mb-80">
          <img
            className="max-h-80 w-full object-cover"
            src={post.cover}
            alt="cover"
          />
        </div>
      )}
      <div className={`${post.cover ? 'mt-80' : ''}`}>
        <Alert
          variant="destructive"
          className={`${post.status === 'declined' ? '' : 'hidden'} mb-10`}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>This post was declined by admin</AlertTitle>
          <AlertDescription>
            reason:{' '}
            {post.status_reason ? post.status_reason : 'No reason provided'}
          </AlertDescription>
        </Alert>

        <div
          className={`${user?.user.id === post.created_by || user?.isAdmin ? '' : 'hidden'} flex flex-wrap gap-2 max-md:justify-center`}
        >
          {user?.isAdmin && (
            <>
              <PublishPost />
              <DeclinePost />
            </>
          )}
          <Button variant="ghost" onClick={handleEdit}>
            <NotebookPen className="mr-2 h-4 w-4" />
            Edit this post
          </Button>
          <DeletePost />
        </div>
        <TypographyH1 className="pb-4 pt-2">{post.title}</TypographyH1>
        <div className="flex items-center gap-2">
          <div
            className="flex cursor-pointer items-center"
            onClick={handleLike}
          >
            <Heart className="mr-2 h-4 w-4" fill={`${ shouldLike ? 'none':'black'}`} />
            <span>{post.likes}</span>
          </div>
          <Avatar>
            <AvatarImage src={post.avatar} alt="avatar" />
            <AvatarFallback>
              {makeInitials(post.firstName, post.lastName)}
            </AvatarFallback>
          </Avatar>
          <p>{post.firstName}</p>
          <p>{post.lastName}</p>
          <DeleteUser id={post.user_id} />
        </div>
      </div>

      <div>
        <div
          className={cn(
            'prose dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export default PostComponent;
