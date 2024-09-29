import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { createPost as createPostFunc } from '@/lib/apiPosts';

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      }),
  });
  return { createPost, isCreating };
}
