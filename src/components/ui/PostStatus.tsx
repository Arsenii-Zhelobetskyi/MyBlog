
import { Button } from '@/components/ui/button';
import { BookAudio, BookCheck, BookX } from 'lucide-react';

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
    { label: 'Published', value: 'status-published', variant: 'outline',icon:<BookCheck className='mr-2 h-4 w-4'/> },
    { label: 'On moderation', value: 'status-on moderation', variant: 'secondary',icon:<BookAudio className='mr-2 h-4 w-4'/> },
    { label: 'Declined', value: 'status-declined', variant: 'destructive', icon:<BookX className='mr-2 h-4 w-4'/> },
  ];
function PostStatus({filter, setFilter}: {filter:string, setFilter: (arg0: string) => void}) {
    return (
        <>
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            disabled={filter === option.value}
            variant={option.variant}
            onClick={() =>
              setFilter(option.value)
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
