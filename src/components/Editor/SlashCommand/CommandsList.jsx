import React, { useState, useEffect } from 'react';

const CommandsList = ({ items, command }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event); // here is nothing on enter
      if (event.key === 'ArrowUp') {
        upHandler();
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        downHandler();
        event.preventDefault();
      } else if (event.key === 'Enter') {
        console.log('test');
        enterHandler();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, items]);

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  const selectItem = (index) => {
    const item = items[index];
    if (item) {
      console.log('Selected item:', item); // Debug log
      command(item);
    }
  };

  return (
    <div className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md text-popover-foreground">
      {items.map((item, index) => (
        <button
          className={`flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors 
                      ${index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/10'}`}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.icon}
          {item.element || item.title}
        </button>
      ))}
    </div>
  );
};

export default CommandsList;
