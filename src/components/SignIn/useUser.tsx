import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/apiAuth';
import { useQueryClient } from '@tanstack/react-query';
export function useUser() {
  const queryClient = useQueryClient();
  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 0,
    retry: false,
  });

  if (error) {
    queryClient.setQueryData(['user'], {
      data: null,
      isAdmin: false,
      isAuthenticated: false,
    }); // manually set some data into the react query cache
  }
  return {
    isPending,
    user,
  };
}
