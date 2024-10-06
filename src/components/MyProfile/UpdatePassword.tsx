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
import { Input } from '@/components/ui/input';
const formSchema = z
  .object({
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });
function UpdatePassword() {
  const { updateUser, isPending } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    updateUser({
      password: data.password,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <TypographyLarge>Update your Password</TypographyLarge>
        <Separator />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">Pass</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Pa$$w0rD!123" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 [&_p]:col-span-4 [&_p]:text-center">
              <FormLabel className="mt-2 text-right">Repeat pass</FormLabel>
              <FormControl className="col-span-3">
                <Input
                  placeholder="Repeat your Pa$$w0rD!123"
                  type="password"
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

export default UpdatePassword;
