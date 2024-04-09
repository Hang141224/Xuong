import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quanlity: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timeseries: true, versionKey: false }
);

export default mongoose.model('Cart', cartSchema)