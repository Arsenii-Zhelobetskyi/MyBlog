import { useDeletePost } from '@/components/Post/useDeletePost';
import { usePost } from '@/components/Post/usePost';
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
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
function DeletePost() {
  const [open, setOpen] = useState(false);

  const { post } = usePost();
  const { deletePost, isDeleting, isSuccess } = useDeletePost();

  function handleSubmit() {
    deletePost({ id: post.id });
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
          Delete this post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete this Post ?</DialogTitle>
          <DialogDescription>
            This will permanently delete this post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="max-sm:gap-4 sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isDeleting}
            type="button"
            onClick={handleSubmit}
            variant="destructive"
          >
            {isDeleting ? 'Working...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePost;
