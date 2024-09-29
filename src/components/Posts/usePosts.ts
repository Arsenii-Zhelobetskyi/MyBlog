import { useQuery } from "@tanstack/react-query";
import { getPosts } from '@/lib/apiPosts';


export function usePosts(){
    const{
        isPending,
        data: posts,
        error,
    }= useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });
    return {isPending, posts, error};
}