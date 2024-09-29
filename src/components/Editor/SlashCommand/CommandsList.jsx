import React, { useState, useEffect, useCallback } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CommandList = ({ editor, items, command }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [show, setShow] = useState(true);
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setShow(false);
        return true;
      }
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
    [selectedIndex, items, editor],
  );

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
  useEffect(() => {
    const handleKeyDown = (event) => onKeyDown(event);

    // Add event listener for keydown when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyDown]);
  return (
    <DropdownMenu open={show}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => selectItem(index)}>
            {item.element || item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommandList;
