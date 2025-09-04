import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { get } from 'http'
import { getProducts } from '../lib/db'
type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    quantity: number
}
export default async function Products() {

    const products: Product[] = await getProducts();
    return (
        <>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {products.map((product) => (
                        <Card className="w-full max-w-sm" key={product.id}>
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription>
                                    {product.description}
                                </CardDescription>
                            </CardHeader>
                            <Link href={'/products/' + product.id} >
                                <CardContent>
                                    <img width={140} className='text-center mx-auto' src={product.imageUrl} alt="" />
                                </CardContent>
                            </Link>

                            <CardFooter className="flex-col gap-2">
                                <Button type="submit" className="w-full">
                                    add to your cart - ${product.price}
                                </Button>
                                <Link href={'/products/' + product.id} className="w-full">
                                <Button variant={'outline'} className="w-full cursor-pointer">
                                    Add to your cart
                                </Button>
                                </Link>
                                
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <Pagination className='bg-'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>

    )
}
