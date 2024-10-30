"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  MessageCircle,
  ShoppingCart,
  Search,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import HomeImage from "@/public/Home.jpg";
import Rangoli from "@/public/Rangoli.jpg";
import Diya from "@/public/Diya.jpg";
import Lantern from "@/public/Lantern.jpg";
import Link from "next/link";

import { StaticImageData } from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
}

interface CartItem extends Product {
  quantity: number;
}

const NavItem = ({
  icon,
  text,
  l_text,
}: {
  icon: React.ReactNode;
  text: string;
  l_text: string;
}) => (
  <Link
    href={l_text}
    className="flex items-center space-x-3 px-5 py-2 rounded-full hover:bg-gradient-to-r from-pink-500 to-yellow-400 hover:text-black transition-all duration-300"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </Link>
);

const ProductCard = ({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (product: Product) => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-lg"
  >
    <div className="relative h-64">
      <Image
        src={product.image}
        alt={product.name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-yellow-400 font-bold">₹{product.price.toFixed(2)}</p>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold py-2 px-4 rounded-full hover:opacity-90 transition-opacity"
      >
        Add to Cart
      </button>
    </div>
  </motion.div>
);

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 shadow-lg z-50 overflow-y-auto"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-white"
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-700"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-400">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-800 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-800 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-xl font-bold">
                  Total: ₹
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <button className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold py-2 px-4 rounded-full hover:opacity-90 transition-opacity">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ReviewCarousel = ({
  reviews,
}: {
  reviews: { name: string; text: string }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "tween", ease: "easeInOut" }}
        className="flex"
      >
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-full md:w-1/3 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full">
              <p className="mb-4 italic">&quot;{review.text}&quot;</p>
              <p className="font-bold text-yellow-400">{review.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: "Royal Diya", price: 49.99, image: Diya },
    { id: 2, name: "Luxury Rangoli Kit", price: 99.9, image: Rangoli },
    { id: 3, name: "Designer Lantern", price: 699.9, image: Lantern },
  ];

  const reviews = [
    {
      name: "Priya S.",
      text: "The quality of the products exceeded my expectations. Truly luxurious!",
    },
    {
      name: "Rahul M.",
      text: "Diwali Luxe has redefined festive shopping. Impeccable service and stunning designs.",
    },
    {
      name: "Anita K.",
      text: "I'm in awe of the craftsmanship. These pieces are conversation starters!",
    },
    {
      name: "Vikram P.",
      text: "Exceptional quality and timely delivery. Will definitely shop again!",
    },
    {
      name: "Meera R.",
      text: "The attention to detail in each product is remarkable. A cut above the rest.",
    },
  ];

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 tracking-wide"
            >
              Diwali Luxe
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <NavItem
                icon={<Home className="w-6 h-6" />}
                text="Home"
                l_text="/"
              />
              <NavItem
                icon={<Info className="w-6 h-6" />}
                text="About"
                l_text="/about"
              />
              <NavItem
                icon={<MessageCircle className="w-6 h-6" />}
                text="Contact"
                l_text="/contact"
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button
                className="bg-yellow-400 text-black rounded-full p-2 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavItem
                  icon={<Home className="w-6 h-6" />}
                  text="Home"
                  l_text="/"
                />
                <NavItem
                  icon={<Info className="w-6 h-6" />}
                  text="About"
                  l_text="/about"
                />
                <NavItem
                  icon={<MessageCircle className="w-6 h-6" />}
                  text="Contact"
                  l_text="/contact"
                />
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <button
                  type="button"
                  className="w-full mt-3 bg-yellow-400 text-black rounded-full p-2 relative flex items-center justify-center"
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <main className="pt-24">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                >
                  Elevate Your Diwali
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 text-gray-300"
                >
                  Discover our exquisite collection of premium Diwali decor and
                  gifts online from &quot;<b>Diwali Luxe</b>&quot;
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg"
                >
                  Shop Now
                </motion.button>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-auto sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={HomeImage}
                    alt="Luxury Diwali Decor"
                    layout="responsive"
                    width={450}
                    height={450}
                    objectFit="cover"
                    className="custom-image-position md:object-center"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              Featured Collections
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 md:p-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Exclusive Diwali Offers
              </h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg p-6 text-black">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    Buy 2 Get 1 Free
                  </h3>
                  <p className="mb-4">On all premium diyas and candles</p>
                  <button className="bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    20% Off on Decor
                  </h3>
                  <p className="mb-4">
                    Luxurious wall hangings and table decorations
                  </p>
                  <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              What Our Customers Say
            </h2>
            <ReviewCarousel reviews={reviews} />
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Stay Illuminated
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-300">
                Subscribe to our newsletter for exclusive offers and Diwali
                inspiration
              </p>
              <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="text-black bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full py-2 px-4 md:py-3 md:px-6 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold py-2 px-6 md:py-3 md:px-8 rounded-full hover:opacity-90 transition-opacity"
                  onClick={(event) => {
                    event.preventDefault();
                    alert("Thank you for subscribing!");
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
