import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, CreditCard, Truck, Shield, ChevronRight } from 'lucide-react';
import { razorpayService } from '../services/razorpayService';
import { orderAPI } from '../services/api';

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckoutPage: React.FC<{ setView: (view: any) => void }> = ({ setView }) => {
  const { state, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return Object.values(shippingAddress).every(value => value.trim() !== '');
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all shipping details');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create Razorpay order
      const order = await razorpayService.createOrder(state.total, 'INR');
      
      // Open Razorpay payment modal
      const response = await razorpayService.openPaymentModal({
        key: 'rzp_test_1234567890abcdef', // Replace with your actual key
        amount: state.total * 100, // Convert to paise
        currency: 'INR',
        name: 'PawSense AI',
        description: 'Purchase of dog products',
        order_id: order.id,
        prefill: {
          name: shippingAddress.name,
          email: 'customer@example.com', // You can get this from user context
          contact: shippingAddress.phone
        },
        notes: {
          shipping_address: JSON.stringify(shippingAddress),
          items: JSON.stringify(state.items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          })))
        },
        handler: async (paymentResponse) => {
          // Verify payment
          const isVerified = await razorpayService.verifyPayment(
            paymentResponse.razorpay_payment_id,
            paymentResponse.razorpay_order_id,
            paymentResponse.razorpay_signature
          );
          
          if (isVerified) {
            // Payment successful - create order in backend
            try {
              const orderData = {
                items: state.items.map(item => ({
                  product: item.product.id,
                  quantity: item.quantity,
                  price: item.product.price,
                  name: item.product.name,
                  image: item.product.image
                })),
                totalAmount: state.total,
                shippingAddress,
                paymentId: paymentResponse.razorpay_payment_id
              };
              
              const orderResponse = await orderAPI.createOrder(orderData);
              console.log('Order created:', orderResponse.data);
              
              alert('Payment successful! Order placed.');
              clearCart();
              setView('HOME'); // Navigate to home page
            } catch (orderError) {
              console.error('Error creating order:', orderError);
              alert('Payment successful but order creation failed. Please contact support.');
            }
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        }
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      if (error.message !== 'Payment cancelled by user') {
        alert('Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No items in cart</h2>
        <p className="text-gray-600 mb-8">Please add items to your cart before checkout.</p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </button>
        <h2 className="text-3xl font-heading font-bold text-gray-800">Checkout</h2>
        <p className="text-gray-600 mt-2">Complete your order details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Truck className="w-6 h-6 text-coral-500 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Shipping Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="123, Main Street, Apartment 4B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="Maharashtra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
                  placeholder="400001"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-coral-500 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Payment Method</h3>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-coral-500 rounded-lg p-4 bg-coral-50">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="razorpay"
                    checked
                    className="w-4 h-4 text-coral-500"
                    readOnly
                  />
                  <label htmlFor="razorpay" className="ml-3 flex items-center cursor-pointer">
                    <span className="font-medium text-gray-800">Razorpay</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Secure</span>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-7">
                  Pay using Credit Card, Debit Card, UPI, Net Banking, or Wallets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            
            {/* Order Items */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.product.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-xs text-gray-600">
                Secure payment powered by Razorpay
              </p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing || !validateForm()}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  Pay with Razorpay
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing this order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
