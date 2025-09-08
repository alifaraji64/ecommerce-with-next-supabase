export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    images: string[],
    quantity: number,
    rating: number,
    category: string
}
export type Comment = {
    id: number,
    body: string,
    name: string,
    postId: number
}
export type CartItem = {
    productId: number,
    quantity: number
}
export type Error = {
    commentText?: string;
    rating?: string;
    purchased?: string;
};
export type formState = {
    errors: Error;
}
export const CartItems: CartItem[] = []