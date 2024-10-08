import { supabase } from '@/lib/supabase';

export async function signUp({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin',
      },
    },
  });
  if (error) throw new Error(error.message);
  const { error: uploadError } = await supabase
    .from('users')
    .update({ firstName, lastName })
    .eq('id', data.user.id);
  if (uploadError) throw new Error(uploadError.message);
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data, 'sign in');
  if (error) throw new Error(error.message);
  
  const { data: user, error: userError } = await supabase
  .from('users')
  .select()
  .eq('id', data.user.id)
  .single();
  if (userError) throw new Error(userError.message);
  return {
    user: { ...user, email: data.user.email },
    isAuthenticated: data.user.role === 'authenticated',
    isAdmin: data.user.user_metadata?.role === 'admin',
  };
  
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  const { data: user, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', data.user.id)
    .single();
  if (userError) throw new Error(userError.message);
  return {
    user: { ...user, email: data.user.email },
    isAuthenticated: data.user.role === 'authenticated',
    isAdmin: data.user.user_metadata?.role === 'admin',
  };
}
