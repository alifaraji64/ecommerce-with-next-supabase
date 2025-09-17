'use client'
import { Product } from '@/lib/types'
import React, { useActionState, useEffect, useState } from 'react'
import { editProduct, Values } from '../actions'
import { toast } from 'sonner'
export default function EditProductForm({ product, categories }: { product: Product, categories: string[] }) {


    const [preview, setPreview] = useState<string[]>([]);
    const [files, setfiles] = useState<File[] | null>(null);
    const [formValues, setFormValues] = useState(product);
    const editProductWithFiles = editProduct.bind(null, { productId: product.id.toString(), images: formValues.images, files })
    const [state, formAction, isPendign] = useActionState(editProductWithFiles, {
        errors: {} as Error,
        values: {} as Values,
        submitted: false,
        data: {} as Product | null
    })
    //use use effect to show success message
    useEffect(() => {
        if (state.submitted) {
            //show success message
            toast.success('Product edited successfully')
            setPreview([])
            setfiles(null)
        }
        if (state.data) {
            setFormValues(state.data)
        }
        if (state.errors.msg) {
            toast.error(state.errors.msg)
        }
    }, [state])
    useEffect(() => {
        setFormValues(product)
    }, [product])
    return !formValues ? <div>Loading...</div> :
        (
            <form action={formAction} className='max-w-lg mx-auto mt-8 grid gap-28'>
                <div className="grid gap-12">
                    <div className="grid gap-2">
                        <label htmlFor="name">Product Name</label>
                        {state.errors.name && <p className='text-red-500'>{state.errors.name}</p>}
                        <input defaultValue={formValues.name} type="text" name="name" id="name" className='w-full border border-gray-300 rounded-md p-2' />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Product Description</label>
                        {state.errors.description && <p className='text-red-500'>{state.errors.description}</p>}
                        <textarea defaultValue={formValues.description} name="description" id="description" className='w-full border border-gray-300 rounded-md p-2' />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="price">Product Price</label>
                        {state.errors.price && <p className='text-red-500'>{state.errors.price}</p>}
                        <input defaultValue={formValues.price} type="number" name="price" id="price" className='w-full border border-gray-300 rounded-md p-2' />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="quantity">Product Quantity</label>
                        {state.errors.quantity && <p className='text-red-500'>{state.errors.quantity}</p>}
                        <input defaultValue={formValues.quantity} type="number" name="quantity" id="quantity" className='w-full border border-gray-300 rounded-md p-2' />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="category">Category</label>
                        {state.errors.category && <p className='text-red-500'>{state.errors.category}</p>}
                        <select defaultValue={formValues.category} defaultChecked={false} name="category" id="category" className='w-full border border-gray-300 rounded-md p-2'>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="imageUrl">Product Image URL</label>
                        {state.errors.image && <p className='text-red-500'>{state.errors.image}</p>}
                        <input onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
                                setPreview((prevImages) => prevImages.concat(fileArray));
                                setfiles((prev) => Array.from(files).concat(prev ?? []))
                                console.log('====================================');
                                console.log(fileArray);
                                console.log('====================================');
                            }
                        }} type="file" name="imageUrl" id="imageUrl" className='w-full border border-gray-300 rounded-md p-2' />
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {formValues.images?.map((src, index) => (
                                <div key={index} className='flex flex-col items-center'>
                                    <img key={index} src={src} alt={`Preview ${index}`} className='w-20 h-20 object-cover rounded' />
                                    <button type='button' className='bg-red-500 text-center p-1 rounded-sm text-white text-sm mt-1' onClick={() => {
                                        setPreview((prev) => prev.filter((_, i) => i !== index));
                                        setfiles((prev) => prev && prev.filter((_, i) => i !== index))
                                        formValues.images = formValues.images.filter((_, i) => i !== index)

                                    }}>Delete</button>
                                </div>
                            ))}
                        </div>
                        {preview.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {preview.map((src, index) => (
                                    <div key={index} className='flex flex-col items-center'>
                                        <img key={index} src={src} alt={`Preview ${index}`} className='w-20 h-20 object-cover rounded' />
                                        <button className='bg-red-500 text-center p-1 rounded-sm text-white text-sm mt-1' onClick={() => {
                                            setPreview((prev) => prev.filter((_, i) => i !== index));
                                        }}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    <button type="submit" disabled={isPendign} className='bg-blue-600 text-white rounded-md p-2'>
                        {isPendign ? 'Editing Product...' : 'Edit Product'}
                    </button>
                </div>
            </form>
        )
}
