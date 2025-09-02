import { getProductById } from '@/app/lib/db';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductCounter from '@/app/components/product-counter';
export default async function SingleProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(Number(id));
    return (
        <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{product?.name}</CardTitle>
                        <CardDescription>
                            {product?.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <div>
                            <p>in Stock: {product?.quantity}</p>
                        </div>
                        <ProductCounter quantity={product?.quantity}></ProductCounter>
                    </CardContent>
                </Card>
            </div>
            <Carousel className=" max-w-xs mx-auto">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img className='text-center mx-auto' src="https://imgs.search.brave.com/T4r0Ba-OkUPmu5YAb0rR4c3ivLbObDlwuPgkRMg0nXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzAzM2M1M2M1LTI5/NmItNGJkYy1jZTU1/LTdlNWU5NGM3YmEw/MC84Ng" alt="" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
