import Posts from '@/components/Posts/Posts';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import PostStatus from '@/components/ui/PostStatus';
import { useUser } from '@/components/SignIn/useUser';
import { Button } from '@/components/ui/button';
function Search() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [filter, setFilter] = useState({
    filterField: 'status',
    filterValue: 'published',
  });
  const { user } = useUser();

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
          className="max-w-[400px]"
          placeholder="Search by title..."
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {user?.isAdmin && (
        <div className="flex justify-center gap-2">
          <PostStatus filter={filter} setFilter={setFilter} />
        </div>
      )}
      <Separator />
      <Posts
        page={page}
        pageSize={5}
        filterQuery={user?.isAdmin? filter: undefined}
        searchQuery={{ searchField: 'title', searchValue: search }}
      />

      <div className='flex justify-center'>

      <Button onClick={()=>setPage((page)=>page+1)}>Load more</Button>
      </div>
    </div>
  );
}

export default Search;
