import Post from '@/components/Posts/PostCard';
import { usePosts } from '@/components/Posts/usePosts';
import Spinner from '@/components/ui/Spinner';
function Posts({
  sortBy,
  pageSize,
  searchQuery,
  filterQuery,
}: {
  sortBy?: { field: string; sortType: string };
  pageSize: number;
  searchQuery?: { searchField: string; searchValue: string };
  filterQuery?: { filterField: string; filterValue: string };
}) {
  const { isPending, posts } = usePosts( pageSize,sortBy,searchQuery,filterQuery);
  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-x-1 gap-y-3 max-[1360px]:grid-cols-3 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1">
      {posts?.map(
        (post: {
          id: number;
          cover: string;
          title: string;
          created_at: string;
          likes: number;
        }) => <Post post={post} key={post.id} />,
      )}
    </div>
  );
}

export default Posts;
