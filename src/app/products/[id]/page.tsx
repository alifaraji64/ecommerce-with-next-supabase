import {  getProductById } from '@/lib/db';
import React from 'react'
import ProductDetailClient from './products-detail-client';
import CartButton from './cart-button';
import Comments from './comments';
import { toast } from 'sonner';
import { getCommentsByProductId } from './actions';
import { Comment } from '@/lib/types';

export default async function SingleProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(Number(id));
    let comments:Comment[]|null=null;
    try {
        comments = await getCommentsByProductId(Number(id));
    } catch (error:any) {
        toast.error(error)
    }


    if (!product) return null;
    return (
        <>
            <ProductDetailClient product={product} ratings={comments?.map(c=>c.rating)??[]}></ProductDetailClient>
            <CartButton></CartButton>
            <Comments comments={comments} productId={Number(id)}></Comments>
        </>
    )
}
