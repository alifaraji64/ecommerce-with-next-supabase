import Link from 'next/link'
type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    quantity: number
}
 const PRODUCTS: Product[] = [
    { id: 1, name: "Product 1", price: 100, description: "This is product 1", imageUrl: "/product1.jpg", quantity: 2 },
    { id: 2, name: "Product 2", price: 200, description: "This is product 2", imageUrl: "/product2.jpg", quantity: 5 },
    { id: 3, name: "Product 3", price: 300, description: "This is product 3", imageUrl: "/product3.jpg", quantity: 0 },
    { id: 4, name: "Product 4", price: 400, description: "This is product 4", imageUrl: "/product4.jpg", quantity: 1 },
    { id: 5, name: "Product 5", price: 500, description: "This is product 5", imageUrl: "/product5.jpg", quantity: 4 },
    { id: 6, name: "Product 6", price: 600, description: "This is product 6", imageUrl: "/product6.jpg", quantity: 3 },
]
export const getProducts=async(): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return PRODUCTS;
}
export const getProductById=async(id:number): Promise<Product | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return PRODUCTS.find(product => product.id === id);
}