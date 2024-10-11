import { memo } from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';


import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
} from 'lucide-react';


function MyBubbleMenu({ editor }: { editor: Editor }) {

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          className="z-20 rounded-md border bg-card shadow"
        >
          <ToggleGroup type="multiple">
         

            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
    </>
  );
}

export default memo(MyBubbleMenu);
