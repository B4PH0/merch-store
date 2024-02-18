import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    idProduct: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const productModel = mongoose.model('products', productSchema);
