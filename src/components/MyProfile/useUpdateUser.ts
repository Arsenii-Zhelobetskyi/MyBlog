import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/lib/apiUser';
export function useUpdateUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (additionalMessage) => {


      if(additionalMessage){
        toast({
          title: additionalMessage,
        });
      }
      else{
        toast({
          title: 'User info updated',
        })
      }
      

    queryClient.invalidateQueries(['user']);
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
