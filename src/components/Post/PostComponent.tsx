import { usePost } from '@/components/Post/usePost';
import { useEffect, useState } from 'react';
import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import HardBreak from '@tiptap/extension-hard-break';

const extensions = [Document, Paragraph, Text, Bold, Italic, Strike, HardBreak];

function PostComponent() {
  const { isPending, post } = usePost();
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (post) {
      setHtml(generateHTML(post.content, extensions));
    }
  }, [post]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default PostComponent;
