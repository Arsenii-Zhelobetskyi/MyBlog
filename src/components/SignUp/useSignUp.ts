import { signUp as signUpFunc } from '@/lib/apiAuth';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function useSignUp() {
  const { toast } = useToast();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpFunc,
    onSuccess: () => {
      toast({
        title: 'Account created!',
        description: 'Check your email to confirm your account.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went during sign up.',
        description: error.message,
      });
    },
  });
  return { signUp, isPending };
}
