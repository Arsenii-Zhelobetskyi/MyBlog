import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/apiPosts';

export function usePosts(
  pageSize: number,
  sortBy?: { field: string; sortType: string },
  searchQuery?: { searchField: string; searchValue: string },
) {
  const {
    isPending,
    data: posts,
    error,
  } = useQuery({
    queryKey: [
      'posts',
      ...(sortBy?.field ? [sortBy.field] : []),
      ...(sortBy?.sortType ? [sortBy.sortType] : []),
      ...(searchQuery?.searchValue ? [`user-${searchQuery?.searchValue}`] : []),
      pageSize,
    ],
    queryFn: () => getPosts(pageSize, sortBy, searchQuery),
  });
  return { isPending, posts, error };
}
