import Posts from '@/components/Posts/Posts';
import { usePosts } from '@/components/Posts/usePosts';
import { useUser } from '@/components/SignIn/useUser';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/Pagination';
import PostStatus from '@/components/ui/PostStatus';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import SortBy from '@/components/Search/SortBy';
const pageSize = 8;

function Search() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [countState, setCountState] = useState(0);
  const [sortBy,setSortBy]=useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [filter, setFilter] = useState({
    filterField: 'status',
    filterValue: 'published',
  });
  const { user } = useUser();

  const { isPending, posts, count } = usePosts(
    pageSize,
    page,
    sortBy,
    { searchField: 'title', searchValue: search },
    filter,
  );

  useEffect(() => {
    if (count !== countState && count !== undefined) {
      setCountState(count);
    }
  }, [count, countState]);
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  function handleSearch(e) {
    const value = e.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setPage(1);
        setSearch(value);
      }, 500),
    );
  }

  function handleSetPage(event: { selected: number }) {
    setPage(event.selected + 1);
  }
  function handleSetFilter(filter: {
    filterField: string;
    filterValue: string;
  }) {
    setFilter(filter);
    setPage(1);
  }
  function handleSetSortBy(sort: string) {
    setSortBy(sort);
    setPage(1);
  }

  const pageCount = Math.ceil(countState / pageSize);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center gap-2">
        <Input
          className="max-w-[310px]"
          placeholder="Search by title..."
          onChange={(e) => handleSearch(e)}
          />
        <SortBy sortBy={sortBy} setSortBy={handleSetSortBy} />
      </div>

      {user?.isAdmin && (
        <div className="flex flex-wrap justify-center gap-2">
          <PostStatus filter={filter} setFilter={handleSetFilter} />
        </div>
      )}
      <Separator />
      <Posts isPending={isPending} posts={posts} />

      {countState === 0 ? null : (
        <div className="flex justify-center">
          <Pagination
            key={pageCount}
            page={page}
            handleSetPage={handleSetPage}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
