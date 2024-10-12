import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const CommandsList = ({ items, command }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.key === 'ArrowUp') {
        upHandler();
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        downHandler();
        event.preventDefault();
      } else if (event.key === 'Enter') {
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
      command(item);
    }
  };

  return (
    <DropdownMenu open={show} onOpenChange={setShow}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      <DropdownMenuContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuItem
            className={
              index === selectedIndex ? 'bg-accent text-accent-foreground' : ''
            }
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.element || item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommandsList;
