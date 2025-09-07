'use client'
import { Product } from '@/app/lib/db'
import React, { useActionState, useEffect } from 'react'
import { editProduct, Values } from '../actions'
import { toast } from 'sonner'

export default function EditProductForm({ product, categories }: { product: Product, categories: string[] }) {
    const [state, formAction, isPendign] = useActionState(editProduct, {
        errors: {} as Error,
        values: {} as Values,
        submitted: false
    })
    //use use effect to show success message
    useEffect(() => {
        if (state.submitted) {
            toast('Product edited successfully');
        }
    }, [state.submitted])

    return (
        <form action={formAction} className='max-w-lg mx-auto mt-8 grid gap-28'>
            <div className="grid gap-12">
                <div className="grid gap-2">
                    <label htmlFor="name">Product Name</label>
                    {state.errors.name && <p className='text-red-500'>{state.errors.name}</p>}
                    <input defaultValue={product.name} type="text" name="name" id="name" className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="description">Product Description</label>
                    {state.errors.description && <p className='text-red-500'>{state.errors.description}</p>}
                    <textarea defaultValue={product.description} name="description" id="description" className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="price">Product Price</label>
                    {state.errors.price && <p className='text-red-500'>{state.errors.price}</p>}
                    <input defaultValue={product.price} type="number" name="price" id="price" className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="quantity">Product Quantity</label>
                    {state.errors.quantity && <p className='text-red-500'>{state.errors.quantity}</p>}
                    <input defaultValue={product.quantity} type="number" name="quantity" id="quantity" className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="category">Category</label>
                    {state.errors.category && <p className='text-red-500'>{state.errors.category}</p>}
                    <select defaultValue={product.category} defaultChecked={false} name="category" id="category" className='w-full border border-gray-300 rounded-md p-2'>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="imageUrl">Product Image URL</label>
                    {state.errors.image && <p className='text-red-500'>{state.errors.image}</p>}
                    <input defaultValue={product.imageUrl} type="file" name="imageUrl" id="imageUrl" className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <button type="submit" disabled={isPendign} className='bg-blue-600 text-white rounded-md p-2'>
                    {isPendign ? 'Editing Product...' : 'Edit Product'}
                </button>
            </div>
        </form>
    )
}
