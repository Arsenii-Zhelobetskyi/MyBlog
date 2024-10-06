import { Input } from '@/components/ui/input';
function SearchComponent() {
  return (
    <div className="flex justify-center items-center">
      <Input className='max-w-96' placeholder='Search by title...' />
    </div>
  );
}

export default SearchComponent;
