import { supabase } from '@/lib/supabase';

export async function likePost({
  id,
  user_id,
  likeQuantity,
  shouldLike,
}: {
  id: number;
  user_id: string;
  likeQuantity: number;
  shouldLike: boolean;
}) {
  if (!shouldLike) {
    const { data, error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', id)
      .eq('user_id', user_id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    const { error: postError } = await supabase
      .from('posts')
      .update({ likes: likeQuantity - 1 })
      .eq('id', id);
    if (postError) {
      throw new Error(postError.message);
    }
  }
  if (shouldLike) {
    const { data, error } = await supabase
      .from('likes')
      .insert({ post_id: id, user_id })
      .select();
    if (error) {
      throw new Error(error.message);
    }
    const { error: postError } = await supabase
      .from('posts')
      .update({ likes: likeQuantity + 1 })
      .eq('id', id);
    if (postError) {
      throw new Error(postError.message);
    }
  }
}

export async function getPost(id: string | undefined) {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('id', id)
    .single();
  if (error) {
    console.log(error);
    throw new Error('Post could not be fetched');
  }
  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('id, firstName, lastName, avatar')
    .eq('id', data.created_by)
    .single();
  if (userDataError) {
    throw new Error(userDataError.message);
  }
  const userInfo = {
    user_id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
  };
  const { data: likesData, error: likesError } = await supabase
    .from('likes')
    .select('user_id')
    .eq('post_id', id);
  if (likesError) {
    throw new Error(likesError.message);
  }
  return { ...data, ...userInfo, likesData };
}

export async function getPosts(
  pageSize: number,
  page?: number,
  sortBy?: string,
  searchQuery?: { searchField: string; searchValue: string },
  filterQuery?: { filterField: string; filterValue: any },
) {
  const [field, sortType ] =sortBy?.split('-') || [undefined, undefined]; 
  const { searchField, searchValue } = searchQuery || {
    searchField: '',
    searchValue: '',
  };
  const { filterField, filterValue } = filterQuery || {
    filterField: '',
    filterValue: '',
  };

  let query = supabase.from('posts').select('*', { count: 'exact' });

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  if (field) {
    query = query.order(field, { ascending: sortType === 'asc' });
  }
  if (searchValue) {
    if (searchField === 'created_by') {
      query = query.eq(searchField, searchValue);
    } else {
      query = query.ilike(searchField, `%${searchValue}%`);
    }
  }
  if (filterValue) {
    query = query.eq(filterField, filterValue);
  }

  query = query.limit(pageSize);
  const { data, count, error } = await query;
  if (error) {
    console.log(error);
    throw new Error('Posts could not be fetched');
  }
  return { data, count };
}

export async function createPost({
  title,
  content,
  cover,
  created_by,
}: {
  title: string;
  content: {};
  cover: File | string | null;
  created_by: string;
}) {
  const post = { title, content, created_by };
  const { data, error } = await supabase.from('posts').insert(post).select();
  if (error) {
    throw new Error(error.message);
  }
  if (!cover) return data;

  const id = data[0].id;

  const fileName = `cover-${id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('covers')
    .upload(fileName, cover);
  if (storageError) throw new Error(storageError.message);

  const { data: updatedPost, error: coverError } = await supabase
    .from('posts')
    .update({
      cover: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/covers/${fileName}`,
    })
    .eq('id', id);
  if (coverError) throw new Error(coverError.message);
  return updatedPost;
}

export async function updatePost({
  id,
  title,
  content,
  cover,
  created_by,
  status = 'on moderation',
  status_reason = '',
}: {
  id: number | null;
  title?: string;
  content?: {};
  cover?: File | string | null;
  created_by?: string;
  status?: string;
  status_reason?: string;
}) {
  const post = { title, content, created_by, status, status_reason };

  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!cover) return data;
  if (cover === data.cover) return data;

  const fileUrl = await uploadImage('cover', id, cover);

  const { data: updatedPost, error: coverUpdateError } = await supabase
    .from('posts')
    .update({
      cover: fileUrl,
    })
    .eq('id', id);
  if (coverUpdateError) throw new Error(coverUpdateError.message);
  return updatedPost;
}

export async function uploadImage(
  name: string,
  id: number | null,
  image: File,
) {
  const fileName = `${name}-${id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from(`${name}s`)
    .upload(fileName, image);
  if (storageError) throw new Error(storageError.message);
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${name}s/${fileName}`;
}

export async function deletePost({ id }: { id: number }) {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
