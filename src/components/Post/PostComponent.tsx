import { usePost } from '@/components/Post/usePost';
import { useEffect, useState } from 'react';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TypographyH1 } from '@/components/ui/TypographyH1';
import Spinner from '@/components/ui/Spinner';

import Underline from '@tiptap/extension-underline';
import { cn } from '@/lib/utils';
const extensions = [StarterKit, Underline];

function PostComponent() {
  const { isPending, post } = usePost();
  const [html, setHtml] = useState('');

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

  return (
    <div className="flex flex-col gap-11">
      <TypographyH1>{post.title}</TypographyH1>
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
