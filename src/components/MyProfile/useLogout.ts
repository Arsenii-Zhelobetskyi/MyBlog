import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutFunc } from '@/lib/apiUser';
import { useNavigate } from 'react-router-dom';
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutFunc,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/', { replace: true });
    },
    onError:(error)=>{
        console.log(error)
    }
  });
    return { logout, isPending };
}
