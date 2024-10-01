import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TypographyLarge } from '../ui/TypographyLarge';
import { Separator } from '../ui/separator';

import { useUpdateUser } from '@/components/MyProfile/useUpdateUser';
import { useUser } from '@/components/SignIn/useUser';
const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

function UpdateFullName() {
  const { user } = useUser();
  const { updateUser, isPending } = useUpdateUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.user?.user_metadata?.firstName,
      lastName: user?.user?.user_metadata?.lastName,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    updateUser({ firstName: data.firstName, lastName: data.lastName });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <TypographyLarge>Update your full name</TypographyLarge>
        <Separator />
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
