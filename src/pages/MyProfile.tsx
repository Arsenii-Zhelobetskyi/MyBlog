import MyProfileComponent from '@/components/MyProfile/MyProfileComponent';
import Posts from '@/components/Posts/Posts';
import { useUser } from '@/components/SignIn/useUser';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
function MyProfile() {
  const { user } = useUser();
  const [filter, setFilter] = useState({
    filterField: 'status',
    filterValue: 'published',
  });

  const filterOptions: {
    label: string;
    value: string;
    variant:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link';
  }[] = [
    { label: 'Published', value: 'published', variant: 'outline' },
    { label: 'On moderation', value: 'on moderation', variant: 'secondary' },
    { label: 'Declined', value: 'declined', variant: 'destructive' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <MyProfileComponent />
      <div className="flex justify-center gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            disabled={filter.filterValue === option.value}
            variant={option.variant}
            onClick={() =>
              setFilter({ filterField: 'status', filterValue: option.value })
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
      <Posts
        pageSize={8}
        filterQuery={filter}
        searchQuery={{ searchField: 'created_by', searchValue: user?.user.id }}
      />
    </div>
  );
}

export default MyProfile;
