import { supabase } from '@/lib/supabase';
export async function updateUserInfo({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}) {
  let updateData;
updateData = { data: {} };

if (firstName) {
    updateData.data = {
        ...updateData.data,
        firstName,
    };
}
if (lastName) {
    updateData.data = {
        ...updateData.data,
        lastName,
    };
}
  if (email) {
    updateData = {
      ...updateData,
      email,
    };
  }
  if (password) {
    updateData = {
      ...updateData,
      password,
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.log(error);
    throw new Error('User info could not be updated');
  }
  return data;
}
