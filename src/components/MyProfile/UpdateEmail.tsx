import { TypographyLarge } from '@/components/ui/TypographyLarge';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateUser } from '@/components/MyProfile/useUpdateUser';
import { useUser } from '@/components/SignIn/useUser';
import { Input } from '@/components/ui/input';
const formSchema = z.object({
  email: z.string().email(),
});
function UpdateEmail() {
  const { user } = useUser();
  const { updateUser, isPending } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.user?.email,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    updateUser({
      email: data.email,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <TypographyLarge>Update your email</TypographyLarge>
        <Separator />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">Email</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="einstein@albert.com"  {...field} />
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

export default UpdateEmail;
