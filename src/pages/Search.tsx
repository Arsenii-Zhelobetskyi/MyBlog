import Posts from '@/components/Posts/Posts';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';

function Search() {
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  function handleSearch(e) {
    const value = e.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setSearch(value);
      }, 500),
    );
  }

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <Input
          className="max-w-96"
          placeholder="Search by title..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Separator />
      <Posts
        pageSize={10}
        searchQuery={{ searchField: 'title', searchValue: search }}
      />
    </div>
  );
}

export default Search;
