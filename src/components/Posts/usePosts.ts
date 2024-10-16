import { getPosts } from '@/lib/apiPosts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(
  pageSize: number,
  page?: number,
  sortBy?: string,
  searchQuery?: { searchField: string; searchValue: string },
  filterQuery: string = 'status-published'
) {
  const queryKey = [
    'posts',
    pageSize,
    ...(page ? [`page-${page}`] : []),
    ...(sortBy ? [`sortBy-${sortBy}`] : []),
    ...(searchQuery?.searchValue ? [`search-${searchQuery?.searchValue}`] : []),
    ...(filterQuery ? [`filter-${filterQuery}`] : []),
  ];

  const { isPending, data, error } = useQuery({
    queryKey,
    queryFn: () => getPosts(pageSize, page, sortBy, searchQuery, filterQuery),
  });

  return { isPending, posts: data?.data, count: data?.count, error };
}
