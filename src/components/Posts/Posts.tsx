import Post from '@/components/Posts/PostCard';
import { usePosts } from '@/components/Posts/usePosts';
import Spinner from '@/components/ui/Spinner';
import { TypographyH3 } from '@/components/ui/TypographyH3';
function Posts({
  sortBy,
  pageSize,
  page,
  searchQuery,
  filterQuery ={ filterField: 'status', filterValue: 'published' },
}: {
  sortBy?: { field: string; sortType: string };
  page?: number;
  pageSize: number;
  searchQuery?: { searchField: string; searchValue: string };
  filterQuery?: { filterField: string; filterValue: string };
}) {
  const { isPending, posts } = usePosts(
    pageSize,
    page,
    sortBy,
    searchQuery,
    filterQuery,
  );
  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  if (posts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <img src="/public/not-found.svg" className="max-w-80" alt="Not Found" />
        <TypographyH3>It's empty here...</TypographyH3>
      </div>
    );
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
