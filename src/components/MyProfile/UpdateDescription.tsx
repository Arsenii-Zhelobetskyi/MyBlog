import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TypographyLarge } from '@/components/ui/TypographyLarge';
import { Separator } from '@/components/ui/separator';

import { useUpdateUser } from '@/components/MyProfile/useUpdateUser';
import { useUser } from '@/components/SignIn/useUser';
import { Textarea } from '@/components/ui/textarea';
const formSchema = z.object({
  description: z.string().min(0).max(350),
});
function UpdateFullName() {
  const { user } = useUser();
  const { updateUser, isPending } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: user?.user?.description,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    updateUser({

      id:user?.user.id,
      description: data.description,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <TypographyLarge>Add or update your description</TypographyLarge>
        <Separator />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">Description</FormLabel>
              <FormControl className="col-span-4">
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
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
