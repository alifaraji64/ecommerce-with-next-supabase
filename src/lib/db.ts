'use server'

import { supabase } from "./supabase";
import { CartItem, Product, Error as CustomError, Comment, formState } from "./types";



const PRODUCTS: Product[] = [
    { id: 1, name: "Product 1", price: 100, description: "This is product 1", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 2, rating: 5, category: "electronics" },
    { id: 2, name: "Product 2", price: 200, description: "This is product 2 and it is an amazing product, check it out", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 5, rating: 4, category: "electronics" },
    { id: 3, name: "Product 3", price: 300, description: "This is product 3 and it is an amazing product, check it out", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 0, rating: 3, category: "electronics" },
    { id: 4, name: "Product 4", price: 400, description: "This is product 4", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 1, rating: 2, category: "electronics" },
    { id: 5, name: "Product 5", price: 500, description: "This is product 5", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 4, rating: 5, category: "electronics" },
    { id: 6, name: "Product 6", price: 600, description: "This is product 6", images: ["https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng"], quantity: 3, rating: 4, category: "electronics" },
]
export const getProducts = async (
    { currentPage, ProductPerPage }: { currentPage: number, ProductPerPage: number })
    : Promise<{ products: Product[] | null, count: number }> => {
    const from = (currentPage - 1) * ProductPerPage;
    const to = from + ProductPerPage - 1
    console.log(from, to);

    const { data, count } = await supabase.from('products').select('*', { count: 'exact' }).range(from, to);
    console.log(count);

    return { products: data, count: count ?? 0 };
}
export const getProductById = async (id: number): Promise<Product | undefined> => {
    console.log('test');

    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    return data as Product;
}
export const addComment = async ({ setisDialogOpen, rating, productId }: { setisDialogOpen: React.Dispatch<React.SetStateAction<boolean>>, rating: number, productId: number }, prevState: formState, formData: FormData) => {
    const errors: CustomError = {};
    console.log('====================================');
    console.log(formData.get('comment'));
    console.log(productId);
    console.log(rating);
    console.log('====================================');
    if (!formData.get('comment')) {
        errors.commentText = 'Comment is required';
    }
    if (rating === 0) {
        errors.rating = 'minimum amount for rating is one star';
    }
    if (Object.keys(errors).length === 0) {
        setisDialogOpen(false)
    }
    return { errors, submitted: true }
}
