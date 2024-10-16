import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const sortByOptions = [
  { label: 'None', value: '' },
  { label: 'Date: newest ', value: 'created_at-desc' },
  { label: 'Date: oldest', value: 'created_at-asc' },
  { label: 'Likes: most', value: 'likes-desc' },
  { label: 'Likes: fever', value: 'likes-asc' },
];

function SortBy({sortBy,setSortBy}:{
  sortBy: string;
  setSortBy: (arg0: string) => void;
}) {

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {sortByOptions.map((option,index) => (
            <DropdownMenuRadioItem key={index} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortBy;
