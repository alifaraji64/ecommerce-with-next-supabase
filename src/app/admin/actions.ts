'use server'
import { supabase } from "../lib/supabase";

export type Error = {
    name?: string;
    price?: string;
    category?: string;
    image?: string;
    description?: string;
    quantity?: string;
    msg?: string;
};
export type Values = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
};
export type FormState = {
    errors: Error;
    values: Values;
}
export const getCategories = async () => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return ['electronics', 'clothing', 'books', 'furniture', 'toys', 'groceries', 'beauty', 'sports', 'automotive', 'other']
}
export const addProduct = async (
    fileCopy: File[] | null,
    prevState: FormState,
    formData: FormData
) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const name = formData.get('name')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const images = fileCopy;
    const description = formData.get('description')?.toString() || '';
    const quantity = formData.get('quantity')?.toString() || '';

    const errors: Error = {};

    // validation
    if (!name || name.length < 3) errors.name = "Name must be at least 3 characters long";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) errors.price = "Price must be a positive number";
    if (!category) errors.category = "Category is required";
    images?.forEach((image) => {
        if ((image.type.startsWith('image/') === false) || (!image.name.endsWith('.jpg') && !image.name.endsWith('.png'))) errors.image = "jpg/png image is required";
    })
    if (!description || description.length < 10) errors.description = "Description must be at least 10 characters long";
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) errors.quantity = "Quantity must be a non-negative number";
    if (!fileCopy || fileCopy.length === 0) errors.image = "Image is required";

    // if validation fails, return immediately
    if (Object.keys(errors).length > 0) {
        return {
            errors,
            values: { name, description, price, quantity, category },
            submitted: false
        };
    }

    try {
        // ✅ await the image upload
        //const url = await uploadImage(fileCopy![0]);
        const URLs = await Promise.all(
            fileCopy!.map(async (file) => await uploadImage(file))
        )
        console.log('Image uploaded successfully:', URLs);
        if (!URLs) {
            return {
                errors: { msg: "Error uploading image" },
                values: { name, description, price, quantity, category },
                submitted: false
            }
        }
            // TODO: store product in DB here
            console.log('save in db');
            const { error, data } = await supabase.from('products').insert({
                name,
                description,
                price: Number(price),
                quantity: Number(quantity),
                category,
                images: [URLs],
                rating: 0
            });
            if (error) {
                return {
                    errors: { msg: error.message },
                    values: { name, description, price, quantity, category },
                    submitted: false
                };
            }
            console.log(data);

            return {
                errors: {} as Error,
                values: { name: '', description: '', price: '', quantity: '', category: '' },
                submitted: true
            };
        } catch (err) {
            console.error('Error uploading image:', err);
            return {
                errors: { image: "Error uploading image" },
                values: { name, description, price, quantity, category },
                submitted: false
            };
        }
    };


    export const editProduct = async (prevState: FormState, formData: FormData) => {
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

    async function uploadImage(file: File) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from("images-for-productss") // 👈 your bucket name
            .upload(fileName, file);

        if (error) {
            throw new Error(error.message);
        }

        // ✅ Get public URL
        const { data } = supabase.storage
            .from("images-for-products")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }