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
  const avatar = {
    avatarImage: user?.user?.user_metadata?.avatar,
    initials:
      (user?.user?.user_metadata?.firstName?.charAt(0) || '').toUpperCase() +
      user?.user?.user_metadata?.lastName?.charAt(0)?.toUpperCase() || '',
  };
  return {
    avatar,
    isPending,
    user,
  };
}

export function useGetUser() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<{
    user: {
      user_metadata: {
        avatar: string;
        firstName: string;
        lastName: string;
      };
    };
    isAuthenticated: boolean;
    isAdmin: boolean;
  }>(['user']);

  const avatar = {
    avatarImage: userData?.user?.user_metadata?.avatar,
    initials:
      (userData?.user?.user_metadata?.firstName?.charAt(0) || '').toUpperCase() +
      userData?.user?.user_metadata?.lastName?.charAt(0)?.toUpperCase() || '',
  };

  return {
    avatar,
    user: {...userData?.user?.user_metadata},
    isAuthenticated: userData?.isAuthenticated,
    isAdmin: userData?.isAdmin,
  };
}
