import Posts from '@/components/Posts/Posts';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/ui/TypographyH1';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10">
        <TypographyH1>Latest posts:</TypographyH1>
        <Posts
          sortBy={{ field: 'created_at', sortType: 'desc' }}
          pageSize={4}
        />
        <TypographyH1>Popular posts:</TypographyH1>
        <Posts sortBy={{ field: 'likes', sortType: 'desc' }} pageSize={4} />
        <TypographyH1>All posts:</TypographyH1>
        <Posts pageSize={4} />

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
