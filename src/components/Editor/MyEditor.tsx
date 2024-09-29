import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';

import MyBubbleMenu from '@/components/Editor/MyBubbleMenu';
import Commands from './SlashCommand/commands.js';
import getSuggestionItems from './SlashCommand/items.js';
import renderItems from './SlashCommand/renderItems.jsx';
import { cn } from '@/lib/utils';

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

const MyEditor = () => {
  const setContent = postStore((state) => state.setContent);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: cn('prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc'),
      },
    },
  });

  useEffect(() => {
    if (editor) setContent(editor.getJSON() as { type: string; content: [] });
  }, [
    editor,
    setContent,
    editor?.storage.characterCount.characters({ mode: 'nodeSize' }),
  ]);

  return (
    <div className="flex-1">
      <EditorContent editor={editor} className="editor" />
      <MyBubbleMenu editor={editor} />
    </div>
  );
};

export default MyEditor;
