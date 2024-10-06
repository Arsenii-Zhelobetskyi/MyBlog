import MyEditor from '@/components/Editor/MyEditor';
import { Button } from '@/components/ui/button';

import { useCreatePost } from '@/components/Editor/useCreatePost';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import postStore from '@/store/postStore.js';
import AddCover from '@/components/Editor/AddCover';
function MainEditor() {
  const { createPost, isCreating } = useCreatePost();
  const [title, setTitle] = useState('');
  const content = postStore((state) => state.content);
  const cover = postStore((state) => state.cover);
  function handleSubmit() {
    createPost({ title, content,cover});
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      {cover && (
        <div className="absolute inset-0 top-20 -z-10">
          <img
            className="max-h-80 w-full object-cover"
            src={URL.createObjectURL(cover)}
            alt="cover"
          />
        </div>
      )}
      <div className={`flex ${cover ? 'mt-80' : ''}`}>
        <Button
          disabled={
            Number(content?.content.length) === 1 || !title || isCreating
          }
          onClick={handleSubmit}
        >
          Post
        </Button>
        <AddCover />
      </div>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-11 h-full scroll-m-20 rounded-none border-none pl-0 text-4xl font-bold focus-visible:ring-0 lg:text-5xl"
        placeholder="Your title"
      />
      <MyEditor />
    </div>
  );
}

export default MainEditor;
