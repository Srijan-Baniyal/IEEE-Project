"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Gift,
  Home,
  Info,
  Menu,
  MessageCircle,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import Diya from "@/public/Diya.jpg";
import HomeImage from "@/public/Home.jpg";
import Lantern from "@/public/Lantern.jpg";
import Rangoli from "@/public/Rangoli.jpg";

type Product = {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
};

type CartItem = Product & {
  quantity: number;
};

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
    className="flex items-center space-x-3 rounded-full from-pink-500 to-yellow-400 px-5 py-2 transition-all duration-300 hover:bg-linear-to-r hover:text-black"
    href={l_text}
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
    className="overflow-hidden rounded-lg bg-opacity-10 shadow-lg backdrop-blur-lg backdrop-filter"
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative h-64">
      <Image
        alt={product.name}
        layout="fill"
        objectFit="cover"
        src={product.image}
      />
    </div>
    <div className="p-4">
      <h3 className="mb-2 font-semibold text-lg">{product.name}</h3>
      <p className="font-bold text-yellow-400">₹{product.price.toFixed(2)}</p>
      <button
        className="mt-4 w-full rounded-full bg-linear-to-r from-yellow-400 to-pink-500 px-4 py-2 font-bold text-black transition-opacity hover:opacity-90"
        onClick={() => addToCart(product)}
        type="button"
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
    {isOpen ? (
      <motion.div
        animate={{ x: 0 }}
        className="fixed top-0 right-0 z-50 h-full w-full overflow-y-auto bg-gray-900 shadow-lg sm:w-96"
        exit={{ x: "100%" }}
        initial={{ x: "100%" }}
        transition={{ type: "tween" }}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-2xl">Your Cart</h2>
            <button
              className="text-gray-500 hover:text-white"
              onClick={onClose}
              title="Close"
              type="button"
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
                  className="flex items-center justify-between border-gray-700 border-b py-4"
                  key={item.id}
                >
                  <div className="flex items-center">
                    <Image
                      alt={item.name}
                      className="rounded-sm"
                      height={50}
                      src={item.image}
                      width={50}
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="rounded-l bg-gray-800 px-2 py-1"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      -
                    </button>
                    <span className="bg-gray-800 px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      className="rounded-r bg-gray-800 px-2 py-1"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-bold text-xl">
                  Total: ₹
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <button
                  className="mt-4 w-full rounded-full bg-linear-to-r from-yellow-400 to-pink-500 px-4 py-2 font-bold text-black transition-opacity hover:opacity-90"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

const _ReviewCarousel = ({
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
        className="flex"
        transition={{ type: "tween", ease: "easeInOut" }}
      >
        {reviews.map((review) => (
          <motion.div
            animate={{ opacity: 1 }}
            className="w-full shrink-0 p-4 md:w-1/3"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={review.name}
          >
            <div className="h-full rounded-lg bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
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
  const [subscribeMessage, setSubscribeMessage] = useState("");

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
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-pink-900 to-black text-white">
      <nav className="fixed top-0 right-0 left-0 z-50 bg-opacity-10 shadow-md backdrop-blur-lg backdrop-filter transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              className="bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text font-extrabold text-3xl text-transparent tracking-wide"
              href="/"
            >
              Diwali Luxe
            </Link>
            <div className="hidden items-center space-x-8 md:flex">
              <NavItem
                icon={<Home className="h-6 w-6" />}
                l_text="/"
                text="Home"
              />
              <NavItem
                icon={<Info className="h-6 w-6" />}
                l_text="/about"
                text="About"
              />
              <NavItem
                icon={<MessageCircle className="h-6 w-6" />}
                l_text="/contact"
                text="Contact"
              />
              <div className="relative">
                <input
                  className="rounded-full bg-opacity-20 px-4 py-2 pl-10 backdrop-blur-lg backdrop-filter focus:outline-hidden focus:ring-2 focus:ring-yellow-400"
                  placeholder="Search..."
                  type="text"
                />
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
              <button
                className="relative rounded-full bg-yellow-400 p-2 text-black"
                onClick={() => setIsCartOpen(true)}
                type="button"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center md:hidden">
              <button
                className="p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden"
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                <NavItem
                  icon={<Home className="h-6 w-6" />}
                  l_text="/"
                  text="Home"
                />
                <NavItem
                  icon={<Info className="h-6 w-6" />}
                  l_text="/about"
                  text="About"
                />
                <NavItem
                  icon={<MessageCircle className="h-6 w-6" />}
                  l_text="/contact"
                  text="Contact"
                />
                <div className="relative mt-3">
                  <input
                    className="w-full rounded-full bg-opacity-20 px-4 py-2 pl-10 backdrop-blur-lg backdrop-filter focus:outline-hidden focus:ring-2 focus:ring-yellow-400"
                    placeholder="Search..."
                    type="text"
                  />
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>
                <button
                  className="relative mt-3 flex w-full items-center justify-center rounded-full bg-yellow-400 p-2 text-black"
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
      <CartSidebar
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <main className="pt-24">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center rounded-2xl bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter md:flex-row md:p-12">
              <div className="mb-8 md:mb-0 md:w-1/2">
                <motion.h1
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text font-bold text-3xl text-transparent md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl"
                  initial={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8 }}
                >
                  Elevate Your Diwali
                </motion.h1>
                <motion.p
                  animate={{ opacity: 1 }}
                  className="mb-6 text-base text-gray-300 md:mb-8 md:text-lg lg:text-xl xl:text-2xl"
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Discover our exquisite collection of premium Diwali decor and
                  gifts online from &quot;<b>Diwali Luxe</b>&quot;
                </motion.p>
                <motion.button
                  className="rounded-full bg-linear-to-r from-yellow-400 to-pink-500 px-6 py-2 font-bold text-base text-black md:px-8 md:py-3 md:text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative h-auto w-full overflow-hidden rounded-lg sm:h-7.5 md:h-87.5 lg:h-100 xl:h-112.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    alt="Luxury Diwali Decor"
                    className="custom-image-position md:object-center"
                    height={450}
                    layout="responsive"
                    objectFit="cover"
                    src={HomeImage}
                    width={450}
                  />
                </motion.div>
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-opacity-10 p-6 text-center backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">
                  <Sparkles className="h-12 w-12 text-yellow-400" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-white">
                  Premium Quality
                </h3>
                <p className="text-gray-300 text-sm">
                  Handcrafted with finest materials
                </p>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-opacity-10 p-6 text-center backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">
                  <Truck className="h-12 w-12 text-pink-400" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-white">
                  Fast Delivery
                </h3>
                <p className="text-gray-300 text-sm">
                  Free shipping on orders above ₹999
                </p>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-opacity-10 p-6 text-center backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">
                  <Shield className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-white">
                  Secure Payment
                </h3>
                <p className="text-gray-300 text-sm">
                  100% safe and secure checkout
                </p>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-opacity-10 p-6 text-center backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">
                  <Gift className="h-12 w-12 text-red-400" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-white">
                  Gift Wrapping
                </h3>
                <p className="text-gray-300 text-sm">
                  Beautiful packaging for every order
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text text-center font-bold text-2xl text-transparent md:mb-12 md:text-3xl lg:text-4xl">
              Featured Collections
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  addToCart={addToCart}
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter md:p-12">
              <h2 className="mb-6 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text text-center font-bold text-2xl text-transparent md:mb-8 md:text-3xl lg:text-4xl">
                Exclusive Diwali Offers
              </h2>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <div className="rounded-lg bg-linear-to-br from-yellow-400 to-pink-500 p-6 text-black">
                  <h3 className="mb-4 font-bold text-xl md:text-2xl">
                    Buy 2 Get 1 Free
                  </h3>
                  <p className="mb-4">On all premium diyas and candles</p>
                  <button
                    className="rounded-full bg-black px-6 py-2 font-bold text-white transition-colors hover:bg-opacity-80"
                    type="button"
                  >
                    Shop Now
                  </button>
                </div>
                <div className="rounded-lg bg-linear-to-br from-purple-600 to-pink-500 p-6 text-white">
                  <h3 className="mb-4 font-bold text-xl md:text-2xl">
                    20% Off on Decor
                  </h3>
                  <p className="mb-4">
                    Luxurious wall hangings and table decorations
                  </p>
                  <button
                    className="rounded-full px-6 py-2 font-bold text-black transition-colors hover:bg-opacity-80"
                    type="button"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text text-center font-bold text-2xl text-transparent md:mb-12 md:text-3xl lg:text-4xl">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter"
                  initial={{ opacity: 0, y: 20 }}
                  key={review.name}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-4 flex items-center space-x-1">
                    {[...new Array(5)].map((_, i) => (
                      <span
                        className="text-yellow-400"
                        key={`star-${review.name}-${i}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-300 italic">
                    &quot;{review.text}&quot;
                  </p>
                  <p className="font-bold text-yellow-400">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-opacity-10 p-6 text-center backdrop-blur-lg backdrop-filter md:p-12">
              <h2 className="mb-4 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text font-bold text-2xl text-transparent md:mb-6 md:text-3xl lg:text-4xl">
                Stay Illuminated
              </h2>
              <p className="mb-6 text-base text-gray-300 md:mb-8 md:text-lg lg:text-xl">
                Subscribe to our newsletter for exclusive offers and Diwali
                inspiration
              </p>
              {subscribeMessage.length > 0 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-full bg-green-500 bg-opacity-20 px-6 py-3 text-green-300"
                  initial={{ opacity: 0, y: -10 }}
                >
                  {subscribeMessage}
                </motion.div>
              )}
              <form
                className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const emailInput = form.elements.namedItem(
                    "email"
                  ) as HTMLInputElement;
                  const nameInput = form.elements.namedItem(
                    "name"
                  ) as HTMLInputElement;

                  if (emailInput?.value && nameInput?.value) {
                    setSubscribeMessage(
                      `Thank you for subscribing, ${nameInput.value}! Check your inbox for exclusive offers.`
                    );
                    form.reset();
                    setTimeout(() => setSubscribeMessage(""), 5000);
                  }
                }}
              >
                <input
                  className="w-full rounded-full bg-white bg-opacity-90 px-4 py-2 text-black placeholder-gray-600 focus:outline-hidden focus:ring-2 focus:ring-yellow-400 md:w-64 md:px-6 md:py-3"
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
                />
                <input
                  className="w-full rounded-full bg-white bg-opacity-90 px-4 py-2 text-black placeholder-gray-600 focus:outline-hidden focus:ring-2 focus:ring-yellow-400 md:w-80 md:px-6 md:py-3"
                  name="email"
                  placeholder="Your email address"
                  required
                  type="email"
                />
                <button
                  className="w-full rounded-full bg-linear-to-r from-yellow-400 to-pink-500 px-6 py-2 font-bold text-black transition-all hover:scale-105 hover:opacity-90 md:w-auto md:px-8 md:py-3"
                  type="submit"
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
