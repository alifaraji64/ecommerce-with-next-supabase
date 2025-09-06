import { getCommentsByProductId, getProductById } from '@/app/lib/db';
import React from 'react'


import ProductDetailClient from './products-detail-client';
import CartButton from './cart-button';
import Comments from './comments';

export default async function SingleProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(Number(id));
    const comments = await getCommentsByProductId(Number(id));
    console.log(comments);

    if (!product) return null;
    return (
        <>
            <ProductDetailClient product={product}></ProductDetailClient>
            <CartButton></CartButton>
            <Comments comments={comments} rating={product.rating} productId={Number(id)}></Comments>
        </>
    )
}
