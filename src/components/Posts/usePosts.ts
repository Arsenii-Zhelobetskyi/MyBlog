import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/apiPosts';

export function usePosts(
  pageSize: number,
  sortBy?: { field: string; sortType: string },
  searchQuery?: { searchField: string; searchValue: string },
  filterQuery?: { filterField: string; filterValue: string },
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
      ...(searchQuery?.searchValue
        ? [`search-${searchQuery?.searchValue}`]
        : []),
      ...(filterQuery?.filterField
        ? [`filter-${filterQuery?.filterValue}`]
        : []),
      pageSize,
    ],
    queryFn: () => getPosts(pageSize, sortBy, searchQuery,filterQuery),
  });
  return { isPending, posts, error };
}
