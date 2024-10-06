import { create } from 'zustand';

interface postState {
  cover: File | null;
  title: string;
  content: {
    type: string;
    content: [];
  };
  setCover: (cover: File) => void;
  setTitle: (title: string) => void;
  setContent: (content: { type: string; content: [] }) => void;
}

const postStore = create<postState>()((set) => ({
  cover: null,
  title: '',
  content: {
    type: 'doc',
    content: [],
  },

  setCover: (cover: File) => set({ cover }),
  setTitle: (title: string) => set({ title }),
  setContent: (content: { type: string; content: [] }) => set({ content }),
}));

export default postStore;
