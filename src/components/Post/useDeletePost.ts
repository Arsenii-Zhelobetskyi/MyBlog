import { useToast } from '@/hooks/use-toast';
import { deletePost as deletePostFunc } from '@/lib/apiPosts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
export function useDeletePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deletePost,
    isPending: isDeleting,
    isSuccess,
  } = useMutation({
    mutationFn: deletePostFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast({
        title: 'Post deleted',
      });
      navigate('/');
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      }),
  });
  return { deletePost, isDeleting, isSuccess };
}
