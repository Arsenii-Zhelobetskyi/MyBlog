import { supabase } from '@/lib/supabase';

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
  return data;
}

export async function getPosts(
  pageSize: number,
  sortBy?: { field: string; sortType: string },
  searchQuery?: { searchField: string; searchValue: string },
) {
  const { field, sortType } = sortBy || { field: '', sortType: '' };
  const { searchField, searchValue } = searchQuery || { searchField: '', searchValue: '' };

  let query = supabase.from('posts').select().limit(pageSize);

  if (field) {
    query = query.order(field, { ascending: sortType === 'asc' });
  }
  if(searchField){
    query = query.eq(searchField, searchValue);
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new Error('Posts could not be fetched');
  }
  return data;
}

export async function createPost({
  title,
  content,
  cover,
  created_by,
}: {
  title: string;
  content: {};
  cover: File | null;
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
