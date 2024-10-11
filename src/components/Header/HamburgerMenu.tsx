import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

import { House, Search, SquareMenu } from 'lucide-react';
function HamburgerMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
        >
          <SquareMenu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2 w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/')}>
            <House className="mr-2 h-4 w-4" /> Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/search')}>
            <Search className="mr-2 h-4 w-4" /> Search
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HamburgerMenu;
