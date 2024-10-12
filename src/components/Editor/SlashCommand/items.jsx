
import { Heading1, Heading2, Heading3, Type } from 'lucide-react';

const getSuggestionItems = ({query}) => {
  return [
    {

      icon:<Type className="mr-2 h-4 w-4" />,
      title: "Text",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      }
    },
    {
      icon:<Heading1 className="mr-2 h-4 w-4" />,
      title: "H1",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleHeading({ level: 1 })
          .run();
      }
    },
    {
      icon:<Heading2 className="mr-2 h-4 w-4" />,
      title: "H2",
      command: ({ editor, range }) => {
        editor
        .chain()
        .focus()
          .deleteRange(range)
          .toggleHeading({ level: 2 })
          .run();
      }
    },
    {

      icon:<Heading3 className="mr-2 h-4 w-4" />,
      title: "H3",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleHeading({ level: 3 })
          .run();
      }
    },
    {
      title: "bold",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      }
    },
    {
      title: "italic",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      }
    },
    {
      title: "image",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      }
    }
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
  };

  export default getSuggestionItems;