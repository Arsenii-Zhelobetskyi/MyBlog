import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/lib/apiUser';
export function useUpdateUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      toast({
        title: 'User info updated',
      });

      queryClient.setQueryData(['user'], {
        user: data.user,
        isAuthenticated: data.user.role === 'authenticated',
        isAdmin: data.user.user_metadata?.role === 'admin',
      });
      // queryClient.invalidateQueries({queryKey:['user']});
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: err.message,
      }),
  });
  return { updateUser, isPending };
}
