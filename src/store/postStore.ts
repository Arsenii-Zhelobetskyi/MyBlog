import { create } from 'zustand';

interface postState {
  title: string;
  content: {
    type: string;
    content: [];
  };
  setTitle: (title: string) => void;
  setContent: (content: { type: string; content: [] }) => void;
}

const postStore = create<postState>()((set) => ({
  title: '',
  content: {
    type: 'doc',
    content: [],
  },

  setTitle: (title: string) => set({ title }),
  setContent: (content: { type: string; content: [] }) => set({ content }),
}));

export default postStore;
