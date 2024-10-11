import { House, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import HamburgerMenu from './HamburgerMenu';

import { Button } from '@/components/ui/button';
function Navigation() {
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden sm:flex">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button variant="ghost" className="" onClick={() => navigate('/')}>
              <House className="mr-2 h-4 w-4" /> Home
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Button variant="ghost" onClick={() => navigate('/search')}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <HamburgerMenu  />
    </NavigationMenu>
  );
}

export default Navigation;
