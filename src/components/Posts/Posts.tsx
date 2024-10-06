import Post from '@/components/Posts/PostCard';
import { usePosts } from '@/components/Posts/usePosts';
import Spinner from '@/components/ui/Spinner';
function Posts() {
  const { isPending, posts } = usePosts();
  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex gap-4">
      {posts?.map(
        (post: {
          id: number;
          cover: string;
          title: string;
          created_at: string;
          likes:number;
        }) => <Post post={post} key={post.id} />,
      )}
    </div>
  );
}

export default Posts;
