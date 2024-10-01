import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import UpdateFullName from '@/components/MyProfile/UpdateFullName';
import UpdateDescription from '@/components/MyProfile/UpdateDescription';

import { ScrollArea } from '@/components/ui/scroll-area';
function UpdateSettings() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Settings</Button>
        </SheetTrigger>
        <SheetContent className='sm:min-w-[400px]'>
          <SheetHeader className='px-4'>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className='h-4/6 px-0'>
            <div className='px-4'>
            <UpdateFullName />
            <UpdateDescription />

            </div>
          </ScrollArea>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <SheetFooter className='px-4'>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default UpdateSettings;
