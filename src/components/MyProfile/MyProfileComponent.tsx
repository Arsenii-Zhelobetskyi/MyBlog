import { TypographyH3 } from '@/components/ui/TypographyH3';

import UpdateSettings from '@/components/MyProfile/UpdateSettings';
import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TypographyP } from '@/components/ui/TypographyP';
function MyProfileComponent() {
  const { user, avatar } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={avatar.avatarImage}
            className="object-cover"
            alt="avatar"
          />
          <AvatarFallback className="sm:text-xl">
            {avatar.initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <TypographyH3 className="text-center">
        Welcome {user?.user?.user_metadata?.firstName}{' '}
        {user?.user?.user_metadata?.lastName}
      </TypographyH3>
      {user?.user?.user_metadata?.description && (
        <TypographyP className="text-center">
          {user?.user?.user_metadata?.description}
        </TypographyP>
      )}
      <UpdateSettings />
      <Separator />
    </div>
  );
}

export default MyProfileComponent;
