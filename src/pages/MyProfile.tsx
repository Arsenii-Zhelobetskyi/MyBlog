import MyProfileComponent from '@/components/MyProfile/MyProfileComponent';
import Posts from '@/components/Posts/Posts';
import { useUser } from '@/components/SignIn/useUser';

import Pagination from '@/components/ui/Pagination';
import { useEffect, useState } from 'react';
import PostStatus from '@/components/ui/PostStatus';
import { usePosts } from '@/components/Posts/usePosts';
const pageSize = 8;
function MyProfile() {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [countState, setCountState] = useState(0);
  const [filter, setFilter] = useState('status-published');
  const { isPending, posts, count } = usePosts(
    pageSize,
    page,
    undefined,
    { searchField: 'created_by', searchValue: user?.user.id },
    filter,
  );

  function handleSetPage(event: { selected: number }) {
    setPage(event.selected + 1);
  }
  function handleSetFilter(filter: string) {
    setFilter(filter);
    setPage(1);
  }

  const pageCount = Math.ceil(countState / pageSize);

  useEffect(() => {
    if (count !== countState && count !== undefined) {
      setCountState(count);
    }
  }, [count, countState]);

  return (
    <div className="flex flex-col gap-8">
      <MyProfileComponent />
      <div className="flex flex-wrap justify-center gap-2">
        <PostStatus filter={filter} setFilter={handleSetFilter} />
      </div>
      <Posts posts={posts} isPending={isPending} />

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

export default MyProfile;
