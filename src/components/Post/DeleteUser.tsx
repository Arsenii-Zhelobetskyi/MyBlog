import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useEffect, useState } from 'react';
import { useDeleteUser } from '@/components/MyProfile/useDeleteUser';
function DeleteUser({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { deleteUser, isPending, isSuccess } = useDeleteUser();
  function handleSubmit() {
    deleteUser(id);
  }
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete this user ?</DialogTitle>
          <DialogDescription>
            This will permanently delete this user.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="max-sm:gap-4 sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="button"
            onClick={handleSubmit}
            variant="destructive"
          >
            {isPending ? 'Working...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUser;
