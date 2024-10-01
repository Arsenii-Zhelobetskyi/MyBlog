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
  if (description!==undefined) {
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
  if (!avatarImage) return data;

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
  return updatedUser;
}
