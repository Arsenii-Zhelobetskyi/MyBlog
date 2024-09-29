import Posts from '@/components/Posts/Posts';
function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          All posts:
        </h1>
        <Posts />
      </div>
    </div>
  );
}

export default Home;
