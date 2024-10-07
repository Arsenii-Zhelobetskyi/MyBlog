import { useUpdatePost } from '@/components/Editor/useUpdatePost';
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
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
function PublishPost() {
  const [open, setOpen] = useState(false);


  const { post } = usePost();
  const { updatePost, isUpdating, isSuccess } = useUpdatePost();

  function handleSubmit() {
    updatePost({ id: post.id, status: 'published', status_reason:'' });
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
          <CircleCheck className="mr-2 h-4 w-4" />
          Publish this post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish this post ?</DialogTitle>
          <DialogDescription>
            This will allow the post to be visible to the public
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="max-sm:gap-4 sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isUpdating}
            type="button"
            onClick={handleSubmit}
          >
            {isUpdating ? 'Working...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PublishPost;
