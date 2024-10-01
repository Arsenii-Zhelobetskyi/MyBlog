import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/apiAuth';
import { useQueryClient } from '@tanstack/react-query';
export function useUser() {
  const queryClient = useQueryClient();
  const { isPending, data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  if (error) {
    queryClient.setQueryData(['user'], {data:null, isAdmin:false, isAuthenticated:false}); // manually set some data into the react query cache
  }

  return {
    isPending,
    user,
  };
}

export function useGetUser(){
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<{ isAuthenticated: boolean , isAdmin:boolean}>(['user']);
  return { isAuthenticated: userData?.isAuthenticated, isAdmin: userData?.isAdmin };
}