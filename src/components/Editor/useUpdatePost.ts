

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { updatePost as updatePostFunc } from '@/lib/apiPosts';

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updatePost, isPending: isUpdating, isSuccess } = useMutation({
    mutationFn: updatePostFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post'],
      });
      toast({
        title: 'Post updated!',
        description: 'Admin will review your post soon.',
      });
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      }),
  });
  return { updatePost, isUpdating, isSuccess };
}
