import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/components/Posts/usePosts';
import Spinner from '@/components/ui/Spinner';
import { TypographyH2 } from '@/components/ui/TypographyH2';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/components/ui/card';

function Posts() {
  const navigate = useNavigate();
  const { isPending, posts } = usePosts();
  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  console.log(posts);
  return (
    <div className="flex gap-2">
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <TypographyH2>{post.title}</TypographyH2>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium leading-none">small desc.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>navigate(`/post/${post.id}`)} variant="link">Read more</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Posts;
