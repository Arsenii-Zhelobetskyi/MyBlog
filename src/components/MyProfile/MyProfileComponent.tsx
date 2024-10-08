import { TypographyH3 } from '@/components/ui/TypographyH3';

import UpdateSettings from '@/components/MyProfile/UpdateSettings';
import { useUser } from '@/components/SignIn/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { TypographyP } from '@/components/ui/TypographyP';
import { makeInitials } from '@/lib/utils';
function MyProfileComponent() {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={user?.user.avatar}
            className="object-cover"
            alt="avatar"
          />
          <AvatarFallback className="sm:text-xl">
            {makeInitials(user?.user.firstName, user?.user.lastName)}
          </AvatarFallback>
        </Avatar>
      </div>
      <TypographyH3 className="text-center">
        Welcome {user?.user?.firstName} {user?.user?.lastName}
      </TypographyH3>
      {user?.user?.description && (
        <TypographyP className="text-center">
          {user?.user?.description}
        </TypographyP>
      )}
      <UpdateSettings />
      <Separator />
    </div>
  );
}

export default MyProfileComponent;
