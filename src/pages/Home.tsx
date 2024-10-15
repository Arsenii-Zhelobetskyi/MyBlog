import Posts from '@/components/Posts/Posts';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/ui/TypographyH1';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/components/Posts/usePosts';
const pageSize = 4;
function Home() {
  const navigate = useNavigate();
  const { isPending: latestPending, posts: latestPosts } = usePosts(
    pageSize,
    undefined,
    'created_at-desc'
  );

  const { isPending: popularPending, posts: popularPosts } = usePosts(
    pageSize,
    undefined,
    'likes-desc'
  );
  const { isPending, posts } = usePosts(pageSize);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10">
        <TypographyH1>Latest posts:</TypographyH1>
        <Posts posts={latestPosts} isPending={latestPending} />
        <TypographyH1>Popular posts:</TypographyH1>
        <Posts posts={popularPosts} isPending={popularPending} />
        <TypographyH1>All posts:</TypographyH1>
        <Posts posts={posts} isPending={isPending} />

        <div className="flex flex-col items-center gap-4">
          <p>ᓚᘏᗢ</p>
          <p>Didn't found anything ?</p>
          <Button onClick={() => navigate('/search')} variant="outline">
            Try searching here....
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
