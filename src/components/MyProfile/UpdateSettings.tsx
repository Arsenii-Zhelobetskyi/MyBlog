import UpdateDescription from '@/components/MyProfile/UpdateDescription';
import UpdateFullName from '@/components/MyProfile/UpdateFullName';
import UpdatePassword from '@/components/MyProfile/UpdatePassword';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import UpdateEmail from '@/components/MyProfile/UpdateEmail';
import { useLogout } from '@/components/MyProfile/useLogout';

import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteAccount from '@/components/MyProfile/DeleteAccount';
function UpdateSettings() {
  const { logout, isPending: loggingOut } = useLogout();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Settings</Button>
        </SheetTrigger>
        <SheetContent className="sm:min-w-[400px]">
          <SheetHeader className="px-4">
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-5/6 px-0">
            <div className="mt-4 space-y-16 px-4">
              <UpdateFullName />
              <UpdateEmail />
              <UpdatePassword />
              <UpdateDescription />
              <div className="pb-16 flex justify-center gap-4 max-sm:flex-col">
                <Button disabled={loggingOut} onClick={() => logout()}>
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </Button>
                <DeleteAccount />
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default UpdateSettings;
