import ReactPaginate from 'react-paginate';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';

function Pagination({
  page,
  handleSetPage,
  pageCount,
}: {
  page: number;
  handleSetPage: any;
  pageCount: number;
}) {
  return (
    <ReactPaginate
      className="flex gap-2"
      breakLabel={
        <span className="flex h-10 w-10 items-center justify-center">
          <Ellipsis className="h-4 w-4" />
        </span>
      }
      nextLabel={
        <Button disabled={page===pageCount} variant="ghost">
          <ChevronRight className="mr-2 h-4 w-4" />
          Next
        </Button>
      }
      onPageChange={handleSetPage}
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      activeClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      disabledLinkClassName="cursor-auto"
      previousLabel={
        <Button disabled={page===1} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      }
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
