import React from 'react'
import { getCategories } from '../actions'
import AddProductForm from './add-product-form';

export default async function AddProduct() {
    const categories = await getCategories()
    if(!categories) return null;
    return (
        <div className='p-4 my-4'>
            <h2 className='text-3xl text-center font-medium'>Add Product</h2>
            <AddProductForm categories={categories}></AddProductForm>
        </div>
    )
}
