'use server'
import { supabase } from "@/app/lib/supabase";
import { Error as CustomError, formState } from "@/app/lib/types";
import { User } from "@clerk/nextjs/server";
import { Comment } from "@/app/lib/types";
export const addComment = async ({ rating, productId, userId,username }: { rating: number, productId: number, userId: string|undefined,username:string|null|undefined }, prevState: formState, formData: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const errors: CustomError = {};
    if (!formData.get('comment')) errors.commentText = 'Comment is required';
    if (rating === 0) errors.rating = 'minimum amount for rating is one star';
    if (!userId) errors.msg = 'You must be logged in to add a comment';
    console.log('user');
    
    console.log(userId);
    
    if (Object.keys(errors).length === 0) {

        const { error } = await supabase.from('comments').insert({
            body: formData.get('comment')!.toString() || '',
            rating,
            productId,
            username
        })
        if (error) {
            errors.msg = error.message;
            return { errors, submitted: false }
        }

        return { errors, submitted: true }
    }
    return { errors, submitted: false }
}

export const getCommentsByProductId = async (id: number): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { error, data } = await supabase.from('comments').select('*').eq('productId', id).select()
    if (error) { throw new Error('error while getting comments, try again later') }
    return data as Comment[];
}