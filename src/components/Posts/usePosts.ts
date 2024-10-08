import { getPosts } from '@/lib/apiPosts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(
  pageSize: number,
  page?: number,
  sortBy?: { field: string; sortType: string },
  searchQuery?: { searchField: string; searchValue: string },
  filterQuery: { filterField: string; filterValue: string } = {
    filterField: 'status',
    filterValue: 'published',
  },
) {
  const queryKey = [
    'posts',
    pageSize,
    ...(page ? [`page-${page}`] : []),
    ...(sortBy?.field ? [sortBy.field] : []),
    ...(sortBy?.sortType ? [sortBy.sortType] : []),
    ...(searchQuery?.searchValue ? [`search-${searchQuery?.searchValue}`] : []),
    ...(filterQuery?.filterField ? [`filter-${filterQuery?.filterValue}`] : []),
  ];

  const { isPending, data, error } = useQuery({
    queryKey,
    queryFn: () => getPosts(pageSize, page, sortBy, searchQuery, filterQuery),
  });

  return { isPending, posts: data?.data, count: data?.count, error };
}
