import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/apiPosts';

export function usePost() {
  const { id } = useParams();
  const {
    isPending,
    data: post,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    retry:false,
  });

  return { isPending, post, error };
}
