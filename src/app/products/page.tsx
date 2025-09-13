import React from 'react'
import {
    Pagination,
    PaginationContent,
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
import { getProducts } from '../lib/db'
import { currentUser } from '@clerk/nextjs/server'

export default async function Products({ searchParams }: { searchParams: { [key: string]: string } }) {
    const currentPage = Number(searchParams.page) || 1
    const ProductPerPage = 1;
    const { products, count } = await getProducts({ currentPage, ProductPerPage });
    const user = await currentUser();
    const role = user?.publicMetadata.role;
    console.log(currentPage);

    if (!products || products.length === 0) {
        return <div className='text-center'>no product has been added</div>
    }

    return (
        <>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {products.map((product) => (
                        <Card className="w-full max-w-sm flex flex-col justify-between" key={product.id}>
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription>
                                    {product.description}
                                </CardDescription>
                            </CardHeader>
                            <Link href={'/products/' + product.id} >
                                <CardContent>
                                    <img width={140} className='text-center mx-auto' src={product.images[0]} alt="" />
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
                                {role == 'admin' ? <Link href={'/admin/edit-product/' + product.id} className="w-full">
                                    <Button variant={'secondary'} className="w-full cursor-pointer">
                                        Edit This Product
                                    </Button>
                                </Link> : null}


                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <Pagination className='bg-'>
                    {currentPage !== 1 ? <PaginationItem>
                        <PaginationPrevious href={`/products?page=${currentPage - 1}`} />
                    </PaginationItem> : null}

                    <PaginationContent>
                        {Array.from({ length: Math.ceil((count! / ProductPerPage)) }).map((_, i) => (
                            <PaginationItem key={i} >
                                <PaginationLink href={`/products?page=${i + 1}`} isActive={currentPage == i + 1}>{i + 1}</PaginationLink>
                            </PaginationItem>))}
                        {ProductPerPage * currentPage < count ? <PaginationItem>
                            <PaginationNext href={`/products?page=${currentPage + 1}`} />
                        </PaginationItem> : null}

                    </PaginationContent>
                </Pagination>
            </div>
        </>

    )
}
