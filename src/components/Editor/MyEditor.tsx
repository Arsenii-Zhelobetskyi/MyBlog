import ContentEditor from '@/components/Editor/ContentEditor';

import AddCover from '@/components/Editor/AddCover';
import { Input } from '@/components/ui/input';
import postStore from '@/store/postStore.js';
function MyEditor() {
  const title = postStore((state) => state.title);
  const setTitle = postStore((state) => state.setTitle);
  const content = postStore((state) => state.content);
  const cover = postStore((state) => state.cover);
  const reset = postStore((state) => state.reset);

  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      {cover && (
        <div className="absolute inset-0 top-20 -z-10">
          <img
            className="max-h-80 w-full object-cover"
            src={cover instanceof File ? URL.createObjectURL(cover) : cover}
            alt="cover"
          />
        </div>
      )}
      <div className={`flex ${cover ? 'mt-80' : ''}`}>
        <AddCover />
      </div>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-11 h-full scroll-m-20 rounded-none border-none pl-0 text-4xl font-bold focus-visible:ring-0 lg:text-5xl"
        placeholder="Your title"
      />
      <ContentEditor />
    </div>
  );
}

export default MyEditor;
