import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TypographyLarge } from '../ui/TypographyLarge';
import { Separator } from '../ui/separator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUpdateUser } from '@/components/MyProfile/useUpdateUser';
import { useUser } from '@/components/SignIn/useUser';
const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});
import { useState } from 'react';
function UpdateFullName() {
  const { user, avatar } = useUser();
  const { updateUser, isPending } = useUpdateUser();
  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.user?.user_metadata?.firstName,
      lastName: user?.user?.user_metadata?.lastName,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      avatarImage,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <TypographyLarge>Update your full name and Avatar</TypographyLarge>
        <Separator />
        <div className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">Avatar</FormLabel>
          <div className="col-span-3 flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatar.avatarImage} alt="avatar" />
              <AvatarFallback>{avatar.initials}</AvatarFallback>
            </Avatar>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setAvatarImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">First name</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Albert" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">Last name</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Einstein" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateFullName;
