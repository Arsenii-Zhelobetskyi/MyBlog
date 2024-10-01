import Posts from '@/components/Posts/Posts';
import { TypographyH1 } from '@/components/ui/TypographyH1';
function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10">
        <TypographyH1>
          All posts:
        </TypographyH1>
        <Posts />
      </div>
    </div>
  );
}

export default Home;
