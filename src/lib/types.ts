export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    images: string[],
    quantity: number,
    rating: number,
    category: string,
    created_at?: Date
}
export type Comment = {
    id: number,
    body: string,
    username: string,
    productId: number,
    rating: number
}
export type CartItem = {
    productId: number,
    quantity: number
}
export type Error = {
    commentText?: string;
    rating?: string;
    purchased?: string;
    msg?: string;
};
export type formState = {
    errors: Error;
}
export const CartItems: CartItem[] = []