import { getCommentsByProductId, getProductById } from '@/app/lib/db';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductCounter from '@/app/components/product-counter';
import { Star } from 'lucide-react';
import ProductDetailClient from './products-detail-client';
import CartButton from './cart-button';
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
            <div className='px-3'>
                <h2 className='text-2xl font-bold'>Comments</h2>
                <div className='flex flex-col gap-3'>
                    {comments.map(comment => (
                        <Card key={comment.id} className='w-full-[calc(100%-1rem)] bg-gray-200 m-4'>
                            <CardContent className="flex-col items-start justify-start p-6 ">
                                <div className='flex gap-2'>
                                    <p className='font-bold text-lg'>{comment.name}</p>
                                    <p>2 days ago</p>
                                    {Array.from({ length: product.rating ?? 0 }).map((_, i) => (
                                        <Star key={i} color='gold' fill='gold' />
                                    ))}
                                </div>
                                <p className='text-left text-xl'>{comment.body}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}
