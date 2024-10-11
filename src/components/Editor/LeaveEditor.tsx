import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import postStore from '@/store/postStore.js';
import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
function LeaveEditor() {
  const [open, setOpen] = useState(false);
  const title = postStore((state) => state.title);
  const cover = postStore((state) => state.cover);
  const reset = postStore((state) => state.reset);
  const isContentDirty = postStore((state) => state.isContentDirty);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const shouldBlock =
      (title !== '' || isContentDirty || cover !== '') &&
      currentLocation.pathname !== nextLocation.pathname;
    setOpen(shouldBlock);
    return shouldBlock;
  });

  function handleReset() {
    blocker.reset();
  }
  function handleSubmit() {
    blocker.proceed();
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure to leave editor ?</DialogTitle>
          <DialogDescription>
            You have unsaved changes that will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="max-sm:gap-4 sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} variant="destructive">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LeaveEditor;
