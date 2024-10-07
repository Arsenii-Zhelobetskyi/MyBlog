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
import { Siren } from 'lucide-react';
import { useEffect, useState } from 'react';
function DeclinePost() {
  const [open, setOpen] = useState(false);

  const [status_reason, setStatus_reason] = useState('');

  const { post } = usePost();
  const { updatePost, isUpdating, isSuccess } = useUpdatePost();

  function handleSubmit() {
    updatePost({ id: post.id, status: 'declined', status_reason });
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
          <Siren className="mr-2 h-4 w-4" />
          Decline this post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Decline this post ?</DialogTitle>
          <DialogDescription>
            This will put the post back to declined
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="You could provide a reason for declining this post"
          value={status_reason}
          onChange={(e) => setStatus_reason(e.target.value)}
        />
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
            variant="destructive"
          >
            {isUpdating ? 'Working...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeclinePost;
