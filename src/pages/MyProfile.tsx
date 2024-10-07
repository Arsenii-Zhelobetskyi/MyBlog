import MyProfileComponent from '@/components/MyProfile/MyProfileComponent';
import Posts from '@/components/Posts/Posts';
import { useUser } from '@/components/SignIn/useUser';
import { useState } from 'react';

import PostStatus from '@/components/ui/PostStatus';
function MyProfile() {
  const { user } = useUser();
  const [filter, setFilter] = useState(
    {
    filterField: 'status',
    filterValue: 'published',
  }
);


  return (
    <div className="flex flex-col gap-8">
      <MyProfileComponent />
      <div className="flex justify-center gap-2">
        <PostStatus filter={filter} setFilter={setFilter} />
      </div>
      <Posts
        pageSize={8}
        filterQuery={filter}
        searchQuery={{ searchField: 'created_by', searchValue: user?.user.id }}
      />
    </div>
  );
}

export default MyProfile;
