import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
