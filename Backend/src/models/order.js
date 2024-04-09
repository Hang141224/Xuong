import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
    },
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [orderItemSchema],
    orderNumber: {
        type: String,
        auto: true,
        unique: true,
    },
    customerName: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timeseries: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);