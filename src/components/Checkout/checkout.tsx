"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button, Divider } from '@nextui-org/react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Image from 'next/image';
import { josefin } from '@/utils/font';
import { getValidImageUrl } from '@/utils/imageUtils';
import Login from "../../shared/Login/Login";
import { Product } from '../Mug/mug';
import axios from 'axios';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { UserRoundIcon } from 'lucide-react';

interface ProductUpdate extends Product {
  quantity: number;
}
const Checkout = () => {
  // const dispatch = useDispatch();
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  // // Calculate total price
  const [open,setOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductUpdate[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      console.log("User ID:", session); 
    }
  }, [session]);
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id); // Remove the item with the matching ID
    setCartItems(updatedCart); // Update the cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    const updatedTotalPrice = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(updatedTotalPrice); // Update the total price
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotalPrice(0);
  };

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        let price = 0;
        for (const item of JSON.parse(storedCart)) {
          price += item.price * item.quantity;
        }
        setTotalPrice(price);
        setCartItems(JSON.parse(storedCart));
      }
    }catch(err) {
      console.error("Error parsing cart from localStorage:", err);
      setCartItems([]);
      setTotalPrice(0);
      toast.error("Error loading cart from localStorage. Please try again.");
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className={`${josefin.className} text-3xl font-bold mb-8`}>Checkout</h1>

      {/* Cart Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={getValidImageUrl(Array.isArray(item.img) ? item.img[0] : item.img)}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"

                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 text-justify my-2">
                      {/* {item.description ? `${item.description.slice(0, 100)}...` : 'No description available'} */}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      {/* {item.faces && <span>Faces: {item.faces}</span>} */}
                      {/* {item.country && <span>• Country: {item.country}</span>} */}
                      {item.size && <span>• Size: {item.size}</span>}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus className="h-3 w-3" />
                    </Button>
                    <div className="rounded-md w-10 h-10 flex items-center justify-center bg-gray-200">
                      <p className="text-sm font-bold">{item.quantity}</p>
                    </div>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      <FaPlus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Price and Remove Button */}
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">Nrs. {(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                color="danger"
                variant="flat"
                onClick={handleClearCart}
                className="w-full sm:w-auto"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className={`${josefin.className} text-xl font-bold mb-4`}>Order Summary</h2>
          <Divider className="my-4" />
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-semibold">Nrs. {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p className="font-semibold">Free</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Tax</p>
              <p className="font-semibold">Nrs. 0.00</p>
            </div>
            <Divider className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">Nrs. {totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-12">
              <h1 className="font-bold"> Pay with </h1>
              <div className="flex justify-between gap-5">
                <Button
                  color="primary"
                  className="w-full mt-2 cursor-pointer"
                  disabled={cartItems.length === 0}
                  onPress={() => {
                    const verifyEsewaPayment = async (amt: number, oid: string, refId: string, productId: string) => {
                      if(!session?.user) {
                        toast.error("you need to login first");
                        setOpen(true);
                        return;
                      }
                      console.log("verifyEsewaPayment() called");
                      try {
                        console.log("waiting for response");

                        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE2_URL}/payment/esewa/verify`, {
                          params: {
                            amt,
                            oid,
                            refId,
                            productId,
                            userId: (session as any).user?.id,
                            fail : "http://localhost:3000/checkout",
                            success: "http://localhost:3000/payment/success?gateway=esewa"
                          },
                        });
                        console.log("response received");

                        if (response.data.success) {
                          console.log(response.data);
                          toast.success('Payment initiated!');
                          window.location.href = response.data.url;
                        } else {
                          toast.error('Payment verification failed!');
                        }
                      } catch (error) {
                        console.error('Error verifying payment:', error);
                        toast.error('An error occurred during payment verification.');
                      }
                    };
                    verifyEsewaPayment(totalPrice, `order-${Date.now()}`, 'refId-placeholder', cartItems.map(item => item._id).join(','));

                  }}
                >
                  E-sewa
                </Button>
                <Button
                  color="primary"
                  className="w-full mt-2 cursor-pointer"
                  disabled={cartItems.length === 0}
                  onPress={() => {
                    const verifyKhaltiPayment = async (token: string, amount: number) => {
                      if(!session?.user) {
                        toast.error("you need to login first");
                        setOpen(true);
                        return;
                      }

                      try {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/payment/khalti/verify`, {
                          token,
                          amount,
                          fail : "http://localhost:3000/checkout",
                          success: "http://localhost:3000/payment/success?gateway=khalti"
                        });

                        console.log(response);
                        if (response.data.success) {
                          toast.success('Payment initiated succesfully');
                          window.location.href = response.data.response.go_link;
                        } else {
                          toast.error('Payment verification failed!');
                        }
                      } catch (error) {
                        console.error('Error verifying payment:', error);
                        toast.error('An error occurred during payment verification.');
                      }
                    };

                    const token = 'token-placeholder'; 
                    const amount = totalPrice; 

                    verifyKhaltiPayment(token, amount);
                  }}
                >
                  Khalti
                </Button>
              </div>
            </div>
                 <Login isOpen={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
