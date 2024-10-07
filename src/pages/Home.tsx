import Posts from '@/components/Posts/Posts';
import { TypographyH1 } from '@/components/ui/TypographyH1';
function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10">
        <TypographyH1>Latest posts:</TypographyH1>
        <Posts
          filterQuery={{ filterField: 'status', filterValue: 'published' }}
          sortBy={{ field: 'created_at', sortType: 'desc' }}
          pageSize={4}
        />
        <TypographyH1>Popular posts:</TypographyH1>
        <Posts
          filterQuery={{ filterField: 'status', filterValue: 'published' }}
          sortBy={{ field: 'likes', sortType: 'desc' }}
          pageSize={4}
        />
        <TypographyH1>All posts:</TypographyH1>
        <Posts
          filterQuery={{ filterField: 'status', filterValue: 'published' }}
          pageSize={4}
        />
      </div>
    </div>
  );
}

export default Home;
