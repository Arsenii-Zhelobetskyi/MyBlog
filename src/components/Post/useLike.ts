
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { likePost as likePostFunc } from '@/lib/apiPosts';
export function useLike() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: like,
    isPending: isLiking,
    isSuccess,
  } = useMutation({
    mutationFn: likePostFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', id],
      });
      toast({
        title: 'operation successful',
      });
    },
    onError: (error) =>
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      }),
  });
  return { like, isLiking, isSuccess };

}
// import { deletePost as deletePostFunc } from '@/lib/apiPosts';

// import { useNavigate } from 'react-router-dom';
// export function useDeletePost() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { toast } = useToast();
//   const {
//     mutate: deletePost,
//     isPending: isDeleting,
//     isSuccess,
//   } = useMutation({
//     mutationFn: deletePostFunc,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['posts'],
//       });
//       toast({
//         title: 'Post deleted',
//       });
//       navigate('/');
//     },
//     onError: (error) =>
//       toast({
//         variant: 'destructive',
//         title: 'Uh oh! Something went wrong.',
//         description: error.message,
//       }),
//   });
//   return { deletePost, isDeleting, isSuccess };
// }

