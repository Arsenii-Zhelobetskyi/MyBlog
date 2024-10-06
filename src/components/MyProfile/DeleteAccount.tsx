import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteUser } from '@/components/MyProfile/useDeleteUser';
import { useUser } from '@/components/SignIn/useUser';
function DeleteAccount() {
  const { deleteUser, isPending } = useDeleteUser();
  const { user } = useUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete My Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you Sure ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="max-sm:gap-4 sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => deleteUser(user.user.id)}
              variant="destructive"
            >
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccount;
