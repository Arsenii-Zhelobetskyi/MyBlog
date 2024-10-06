import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as deleteUserFunc } from '@/lib/apiUser';
import { useNavigate } from 'react-router-dom';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: deleteUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/', { replace: true });
    },
  });
  return { deleteUser, isPending };
}
