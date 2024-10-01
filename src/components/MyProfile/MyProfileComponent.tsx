import { TypographyH3 } from '@/components/ui/TypographyH3';

import UpdateSettings from '@/components/MyProfile/UpdateSettings';
import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TypographyP } from '@/components/ui/TypographyP';

function MyProfileComponent() {
  const { user, avatar } = useUser();
  return (
    <>
      <div>
        <Avatar className="sm:h-20 sm:w-20">
          <AvatarImage src={avatar.avatarImage} alt="avatar" />
          <AvatarFallback className="sm:text-xl">
            {avatar.initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <TypographyH3 className="text-center">
        Welcome {user?.user?.user_metadata?.firstName}{' '}
        {user?.user?.user_metadata?.lastName}
      </TypographyH3>
      <TypographyP className="text-center">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.
      </TypographyP>
      <Separator />
      <UpdateSettings />
    </>
  );
}

export default MyProfileComponent;
