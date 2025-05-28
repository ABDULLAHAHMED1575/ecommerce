import api from './api';

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post(`/cart/${userId}`, {
      product_id: productId,
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add item to cart');
  }
};

export const getCart = async (userId) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch cart');
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await api.delete(`/cart/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to remove item from cart');
  }
};

export const createOrder = async (cartId) => {
  try {
    const response = await api.post('/orders', {
      cart_id: cartId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to create order');
  }
};

export const getUserOrders = async (userId) => {
  console.log(userId);
  
  try {
    const response = await api.get(`/orders/${userId}`);
    console.log("order response: ", response.data);
    
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch orders');
  }
};

export const processPayment = async (orderId, paymentMethod) => {
  try {
    const response = await api.post('/payment', {
      order_id: orderId,
      payment_method: paymentMethod
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Payment processing failed');
  }
};