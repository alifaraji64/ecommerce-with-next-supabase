'use client'
import { Product } from '@/app/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

export default function ProductDetailClient({product}:{product:Product}) {
    const [counter, setcounter] = useState(0)
  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                <div className='w-2/3 mx-auto'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-3xl'>{product.name}</CardTitle>
                            <CardDescription className='text-xl'>
                                {product.description}
                            </CardDescription>
                            <div className='flex items-center'>
                                {
                                    Array.from({ length: product.rating ?? 0 }).map((_, i) => (
                                        <Star key={i} color='gold' fill='gold' />
                                    ))
                                }
                                {
                                    Array.from({ length: 5 - (product.rating ?? 0) }).map((_, i) => (
                                        <Star key={i} color='gold' />
                                    ))
                                }
                                <p>based on 100 reviews</p>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                            <div>
                                <p>in Stock: {product.quantity}</p>
                            </div>
                          <div>
                                      <Button className='select-none' variant={'destructive'} disabled={counter === 0} onClick={()=>{
                                          if(counter > 0)
                                          setcounter(counter - 1)
                                      }}>-</Button>
                                      <span className='px-2 select-none'>{counter}</span>
                                      <Button variant={'default'} className='bg-blue-600 select-none' disabled={counter >= (product.quantity ?? 0)} onClick={() => {
                                          if(counter<product.quantity!)
                                          setcounter(counter + 1)
                                      }
                                      }>+</Button>
                                  </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full cursor-pointer">
                                Add to your cart
                            </Button>
                            <Button variant="outline" className="w-full cursor-pointer">
                                checkout
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className='text-center'>
                    <Carousel className=" max-w-xs mx-auto  min-w-1/2 grid-cols-3">
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
                    <ul className='text-gray-500 list-inside'>
                        <li>free shipping</li>
                        <li>30-day returns</li>
                        <li>1-year warranty</li>
                        <li>secure payments</li>
                    </ul>
                </div>

            </div>
  )
}
