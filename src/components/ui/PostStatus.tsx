
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BookCheck, BookX ,BookAudio } from 'lucide-react';

  const filterOptions: {
    label: string;
    value: string;
    variant:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link';
    icon: JSX.Element;
  }[] = [
    { label: 'Published', value: 'published', variant: 'outline',icon:<BookCheck className='mr-2 h-4 w-4'/> },
    { label: 'On moderation', value: 'on moderation', variant: 'secondary',icon:<BookAudio className='mr-2 h-4 w-4'/> },
    { label: 'Declined', value: 'declined', variant: 'destructive', icon:<BookX className='mr-2 h-4 w-4'/> },
  ];
function PostStatus({filter, setFilter}: {filter: {filterField: string, filterValue: string}, setFilter: (arg0: {filterField: string, filterValue: string}) => void}) {
    return (
        <>
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            disabled={filter.filterValue === option.value}
            variant={option.variant}
            onClick={() =>
              setFilter({ filterField: 'status', filterValue: option.value })
            }
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
        </>
    )
}

export default PostStatus
