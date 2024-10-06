import { TypographyH1 } from '@/components/ui/TypographyH1';
import { TypographyH3 } from '@/components/ui/TypographyH3';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <TypographyH1>/ᐠ｡ꞈ｡ᐟ\ </TypographyH1>
      <TypographyH1>404</TypographyH1>
      <TypographyH3>This page doesn't exist</TypographyH3>
      <Button onClick={()=>navigate('/')}>Go back</Button>
    </div>
  );
}

export default NotFound;
