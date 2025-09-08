export const dynamic = "force-dynamic";

import { getProductById } from '@/app/lib/db';
import React, { useActionState } from 'react'
import { editProduct, getCategories, Values } from '../../actions';
import EditProductForm from '../edit-product-form';

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(Number(id));
    const categories = await getCategories()
    if (!product || !categories) return null;
    return (

        <div className='p-4 my-4'>
            <h2 className='text-3xl text-center font-medium'>Edit Product</h2>
            <EditProductForm categories={categories} product={product}></EditProductForm>
        </div>
    )
}
