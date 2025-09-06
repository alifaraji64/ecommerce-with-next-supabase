
export type Error = {
    name?: string;
    price?: string;
    category?: string;
    image?: string;
    description?: string;
    quantity?: string;
};
export type Values = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    imageUrl: any;
};
export type FormState = {
    errors: Error;
    values: Values;
}
export const getCategories = async () => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return ['electronics', 'clothing', 'books', 'furniture', 'toys', 'groceries', 'beauty', 'sports', 'automotive', 'other']
}
export const addProduct = async (prevState: FormState, formData: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const name = formData.get('name')?.toString();
    const price = formData.get('price')?.toString();
    const category = formData.get('category')?.toString();
    const image = formData.get('imageUrl') as File;
    const description = formData.get('description')?.toString();
    const quantity = formData.get('quantity')?.toString();
    const errors: Error = {};
    if (!name || name.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        errors.price = "Price must be a positive number";
    }
    if (!category) {
        errors.category = "Category is required";
    }
    if (image.type.startsWith('image/') === false || (!image.name.endsWith('.jpg') && !image.name.endsWith('.png'))) {
        errors.image = "jpg/png image is required";
    }
    if (!description || description.length < 10) {
        errors.description = "Description must be at least 10 characters long";
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) {
        errors.quantity = "Quantity must be a non-negative number";
    }
    if (Object.keys(errors).length === 0) {
        // store in db
        console.log('save in db');
        return { errors: {} as Error, values: {} as Values };
    }
    return { errors, values: { name: name || '', description: description || '', price: price || '', quantity: quantity || '', category: category || '', imageUrl: image || '' } };
}

export const editProduct = async (prevState: FormState, formData: FormData) => {
    console.log('====================================');
    console.log(prevState);
    console.log('====================================');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const name = formData.get('name')?.toString();
    const price = formData.get('price')?.toString();
    const category = formData.get('category')?.toString();
    const image = formData.get('imageUrl') as File;
    const description = formData.get('description')?.toString();
    const quantity = formData.get('quantity')?.toString();
    const errors: Error = {};
    if (!name || name.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        errors.price = "Price must be a positive number";
    }
    if (!category) {
        errors.category = "Category is required";
    }
    if (image.type.startsWith('image/') === false || (!image.name.endsWith('.jpg') && !image.name.endsWith('.png'))) {
        errors.image = "jpg/png image is required";
    }
    if (!description || description.length < 10) {
        errors.description = "Description must be at least 10 characters long";
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) {
        errors.quantity = "Quantity must be a non-negative number";
    }
    if (Object.keys(errors).length === 0) {
        // store in db
        console.log('save in db edit');
        return { errors: {} as Error, values: {} as Values, submitted: true };
    }
    return { errors, values: { name: name || '', description: description || '', price: price || '', quantity: quantity || '', category: category || '', imageUrl: image || '' } };
}