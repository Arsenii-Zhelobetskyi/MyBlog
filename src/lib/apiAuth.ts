import { supabase } from '@/lib/supabase';

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: '',
      },
    },
  });
  if (error) throw new Error(error.message);
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;

}

export async function getCurrentUser() {
  const { data: session} = await supabase.auth.getSession();

  if(!session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message);

  return {user:data.user, isAuthenticated: data.user.role === "authenticated", isAdmin: data.user.user_metadata?.role==="admin"}; 
}
