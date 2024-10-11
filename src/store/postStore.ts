import { create } from 'zustand';

interface postState {
  id: number | null;
  cover: File | string;
  title: string;
  content: {
    type: string;
    content: [];
  };
  editor: any;
  isContentDirty: boolean;

  setId: (id: number) => void;
  setCover: (cover: File) => void;
  setTitle: (title: string) => void;
  setContent: (content: { type: string; content: [] }) => void;
  setEditor: (editor: any) => void;
  setIsContentDirty: (isContentDirty: boolean) => void;
  reset: () => void;
}

const postStore = create<postState>()((set) => ({
  id: null,
  cover: '',
  title: '',
  content: {
    type: 'doc',
    content: [],
  },
  editor: null,
  isContentDirty: false,

  setId: (id: number) => set({ id }),
  setCover: (cover: File | string) => set({ cover }),
  setTitle: (title: string) => set({ title }),
  setContent: (content: { type: string; content: [] }) => set({ content }),
  setEditor: (editor: any) => set({ editor }),
  setIsContentDirty: (isContentDirty: boolean) => set({ isContentDirty }),
  reset: () => {
    set({
      id: null,
      cover: '',
      title: '',
      content: {
        type: 'doc',
        content: [],
      },
      isContentDirty: false,
    });
  },
}));

export default postStore;
