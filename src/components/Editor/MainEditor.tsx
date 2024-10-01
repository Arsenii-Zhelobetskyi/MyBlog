import MyEditor from '@/components/Editor/MyEditor';
import { Button } from '@/components/ui/button';

import { useCreatePost } from '@/components/Editor/useCreatePost';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import postStore from '@/store/postStore.js';
function MainEditor() {
  const { createPost, isCreating } = useCreatePost();
  const [title, setTitle] = useState('');
  const content = postStore((state) => state.content);
  function handleRofl() {
    createPost({ title, content });
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-11">
      <div className="flex justify-center">
        <Button
          className="max-w-20"
          disabled={
            Number(content?.content.length) === 1 || !title || isCreating
          }
          onClick={handleRofl}
        >
          Post
        </Button>
      </div>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-full scroll-m-20 rounded-none border-none pl-0 text-4xl font-bold focus-visible:ring-0 lg:text-5xl"
        placeholder="Your title"
      />
      <MyEditor />
    </div>
  );
}

export default MainEditor;
