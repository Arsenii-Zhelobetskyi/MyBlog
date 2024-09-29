import { supabase } from "@/lib/supabase";
export async function getPost(id:string | undefined){
    const {data,error} = await supabase.from('posts').select().eq('id',id).single();
    if (error){
        console.log(error)
        throw new Error("Post could not be fetched");
    }
    return data;
}

export async function getPosts(){
    const {data,error} = await supabase.from('posts').select();
    if (error){
        console.log(error)
        throw new Error("Posts could not be fetched");
    }
    return data;
}


export async function createPost(post: { title: string; content: {}}){
    const {error} = await supabase.from('posts').insert([post]);

    if (error){
        console.log(error)
        throw new Error("Post could not be created");
    }
}