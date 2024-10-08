import MyProfileComponent from '@/components/MyProfile/MyProfileComponent';
import Posts from '@/components/Posts/Posts';
import { useUser } from '@/components/SignIn/useUser';
import { useState } from 'react';

import PostStatus from '@/components/ui/PostStatus';
import { usePosts } from '@/components/Posts/usePosts';
function MyProfile() {
  const { user } = useUser();
  const [filter, setFilter] = useState({
    filterField: 'status',
    filterValue: 'published',
  });

  const { isPending, posts } = usePosts(
    5,
    undefined,
    undefined,
    { searchField: 'created_by', searchValue: user?.user.id },
    filter,
  );

  return (
    <div className="flex flex-col gap-8">
      <MyProfileComponent />
      <div className="flex justify-center gap-2">
        <PostStatus filter={filter} setFilter={setFilter} />
      </div>
      <Posts posts={posts} isPending={isPending} />
    </div>
  );
}

export default MyProfile;
