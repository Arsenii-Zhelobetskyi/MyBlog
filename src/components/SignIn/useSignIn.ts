import { signIn as signInFunc } from '@/lib/apiAuth';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: signInFunc,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], {
        user: data.user,
        isAuthenticated: data.user.role === 'authenticated',
        isAdmin: data.user.user_metadata?.role === 'admin',
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went during sign in.',
        description: error.message,
      });
    },
  });
  return { signIn, isPending };
}
