import { cn } from '@/lib/utils';

import { LoaderCircle } from 'lucide-react';

function Spinner({ className }: { className?: string }) {
    return (
    <LoaderCircle
      className={cn('my-28 h-16 w-16 text-primary/60 animate-spin', className)}
    />
    )
}

export default Spinner

