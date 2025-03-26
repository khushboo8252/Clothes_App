import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = new Order({ user: req.user.id, items, totalAmount });
  await order.save();
  res.json({ message: 'Order placed successfully' });
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
};
