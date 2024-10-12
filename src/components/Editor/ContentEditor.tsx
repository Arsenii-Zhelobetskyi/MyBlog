import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

import MyBubbleMenu from '@/components/Editor/MyBubbleMenu';
import { cn } from '@/lib/utils';
import Commands from './SlashCommand/commands.js';
import getSuggestionItems from './SlashCommand/items.js';
import renderItems from './SlashCommand/renderItems.js';

import postStore from '@/store/postStore.js';
import { useEffect } from 'react';

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Placeholder.configure({
    placeholder: 'Write something, or type / to use commands',
  }),

  Commands.configure({
    suggestion: {
      items: getSuggestionItems,
      render: renderItems,
    },
  }),
  Underline,
  CharacterCount,
];

const ContentEditor = () => {
  const content = postStore((state) => state.content);
  const setEditor = postStore((state) => state.setEditor);

  const setIsContentDirty = postStore((state) => state.setIsContentDirty);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: cn('prose dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc'),
      },
    },
    content: content.content.length ? content : undefined,
    onUpdate: ({ editor }) => {
      if(editor.storage.characterCount.characters()>0){
        setIsContentDirty(true);
      }
      else{
        setIsContentDirty(false);
      }
    },
  });

  useEffect(() => {
    setEditor(editor);
  }, [editor, setEditor]);
  return (
    <div className="flex-1">
      <EditorContent editor={editor} className="editor" />
      <MyBubbleMenu editor={editor} />
    </div>
  );
};

export default ContentEditor;
