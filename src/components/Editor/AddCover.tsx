import { Image } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import postStore from '@/store/postStore.ts';
function AddCover() {
  const setCover = postStore((state) => state.setCover);
  function handleCoverChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Image className="mr-2 h-4 w-4" />
          Add cover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a cover</DialogTitle>
          <DialogDescription>Background image for your post</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              onChange={handleCoverChange}
              className="cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <DialogFooter className="max-sm:gap-4 sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCover;
