import React, { useEffect } from 'react';
import MyEditor from '@/components/Editor/MyEditor';
import postStore from '@/store/postStore.js';

const Editor = React.memo(() => {
  const reset = postStore((state) => state.reset);

  return <MyEditor />;
});

export default Editor;