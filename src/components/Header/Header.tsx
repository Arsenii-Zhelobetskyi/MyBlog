import Navigation from '@/components/Header/Navigation';
import { Button } from '@/components/ui/button';
function Header() {
  return (
    <header className="px-8 py-5">
      {/* LOGO  */}
      <div className="mx-auto flex max-w-7xl justify-between">
        <Navigation />
        <div className="flex gap-2">
          <Button variant="link">Sign in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
