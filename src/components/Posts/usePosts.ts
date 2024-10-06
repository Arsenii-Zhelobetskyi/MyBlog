import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/apiPosts';

export function usePosts(
  sortBy?: { field: string; sortType: string },
  pageSize: number,
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
      pageSize
    ],
    queryFn: () => getPosts(sortBy,pageSize),
  });
  return { isPending, posts, error };
}
