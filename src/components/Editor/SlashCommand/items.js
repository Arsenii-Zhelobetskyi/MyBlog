const getSuggestionItems = (query) => {
  const normalizedQuery = typeof query === "string" ? query.toLowerCase() : "";

  return [
    {
      title: "Text",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();

      }
    },
    {
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
    .filter((item) => item.title.toLowerCase().startsWith(normalizedQuery))
    .slice(0, 10);
};

export default getSuggestionItems;