import { supabase } from '@/lib/supabase';
export async function updateUserInfo({
  firstName,
  lastName,
  email,
  password,
  avatarImage,
  description,
}: {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  avatarImage?: object | null;
  description?: string | undefined;
}) {
  let updateData;
  updateData = { data: {} };
  const additionalMessage = email
    ? 'Check your email for the verification link'
    : '';

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
  if (description !== undefined) {
    updateData.data = {
      ...updateData.data,
      description,
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
    throw new Error(error.message);
  }
  if (!avatarImage) return { data, additionalMessage };

  // upload avatar

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatarImage);
  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);
  return { data: updatedUser, additionalMessage };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id: { id: string }) {
  // const { error } = await supabase.auth.admin.deleteUser(id);
  // const { error } = await supabase
  //   .from('should_delete_user')
  //   .insert([{ id }]);
  // const { errorE } = await supabase
  //   .from('should_delete_user')
  //   .delete()
  //   .eq('id', id);
  // if(errorE)
  // {
  //   console.log(errorE.message);
  // }
  // if (error) {

  //   console.log(error.message);
  //   throw new Error(error.message);
  // }
}
