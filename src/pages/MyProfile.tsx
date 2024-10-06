import MyProfileComponent from '@/components/MyProfile/MyProfileComponent';
import Posts from '@/components/Posts/Posts';
import { useUser } from '@/components/SignIn/useUser';
import { Button } from '@/components/ui/button';
function MyProfile() {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-8">
      <MyProfileComponent />
      <div className="flex justify-center gap-2">
        <Button variant="outline">Published</Button>
        <Button variant="secondary">On moderation</Button>
        <Button disabled={true} variant="destructive">
          Declined
        </Button>
      </div>
      <Posts pageSize={8} searchQuery={{searchField:"created_by",searchValue:user?.user.id}} />
    </div>
  );
}

export default MyProfile;
