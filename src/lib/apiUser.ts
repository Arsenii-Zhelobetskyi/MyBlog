import { supabase } from '@/lib/supabase';
export async function updateUserInfo({
  id,
  firstName,
  lastName,
  email,
  password,
  avatarImage,
  description,
}: {
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  avatarImage?: object | null;
  description?: string | undefined;
}) {
  let updateData;
  updateData = {};
  const additionalMessage = email
    ? 'Check your email for the verification link'
    : '';

  if (firstName) {
    updateData = {
      ...updateData,
      firstName,
    };
  }
  if (lastName) {
    updateData = {
      ...updateData,
      lastName,
    };
  }
  if (description !== undefined) {
    updateData = {
      ...updateData,
      description,
    };
  }

  if (id) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (!avatarImage) return { data, additionalMessage };

    const fileName = `avatar-${id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarImage);
    if (storageError) throw new Error(storageError.message);

    const { data: updatedUser, error: avatarError } = await supabase
      .from('users')
      .update({
        avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      })
      .eq('id', id)
      .select()
      .single();
    if (avatarError) throw new Error(avatarError.message);
    return { data: updatedUser, additionalMessage };
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
  return { data, additionalMessage };

  // upload avatar
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id: { id: string }) {
  // const { error } = await supabase.auth.admin.deleteUser(id);
  const { data, error } = await supabase.rpc('delete_user_by_id', {
    user_id: id,
  });
  // const { data, error } = await supabase.rpc('get_all_users_metadata')
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
