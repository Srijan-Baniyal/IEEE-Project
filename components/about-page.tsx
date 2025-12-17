"use client";

import { Home, Info, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-pink-900 to-black text-white">
      <nav className="fixed top-0 right-0 left-0 z-50 bg-white bg-opacity-10 shadow-md backdrop-blur-lg backdrop-filter transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link
              className="bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text font-extrabold text-2xl text-transparent tracking-wide sm:text-3xl"
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
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <div className="md:hidden">
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
          </div>
        ) : null}
      </nav>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-8 px-4 pt-20 text-center sm:space-y-12 sm:pt-0">
        <div className="bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text font-extrabold text-4xl text-transparent drop-shadow-md sm:text-6xl">
          About Diwali Luxe
        </div>
        <div className="max-w-3xl text-base text-white/80 leading-relaxed tracking-wide sm:text-lg">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-yellow-400">Diwali Luxe</span>,
            a luxury platform for all things Diwali. We bring you the finest in
            decor, gifts, and experiences to make your celebration
            extraordinary. Discover our curated collection that perfectly blends
            tradition and elegance for this joyous festival. And yeah the
            competition website for{" "}
            <span className="font-semibold text-yellow-400">IEEE</span>.
          </p>
        </div>
        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          <div className="transform rounded-2xl bg-white bg-opacity-10 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:p-8">
            <h2 className="mb-4 font-semibold text-2xl text-yellow-400 sm:text-3xl">
              Tech Stack
            </h2>
            <ul className="space-y-2 text-base sm:text-lg">
              <li>- Next.js (App Dir)</li>
              <li>- React.js</li>
              <li>- Tailwind CSS</li>
              <li>- Lucide Icons</li>
              <li>- Framer Motion</li>
              <li>- TypeScript</li>
              <li>- Eslint</li>
              <li>- Prettier</li>
            </ul>
          </div>

          <div className="transform rounded-2xl bg-white bg-opacity-10 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:p-8">
            <h2 className="mb-4 font-semibold text-2xl text-yellow-400 sm:text-3xl">
              Features
            </h2>
            <ul className="space-y-2 text-base sm:text-lg">
              <li>- Stunning Visuals</li>
              <li>- Fast and Lightweight</li>
              <li>- Responsive Design</li>
              <li>- Smooth Animations</li>
              <li>- 4k Image Quality</li>
              <li>- 99.9% User Experience</li>
              <li>- 99.9% Uptime</li>
            </ul>
          </div>

          <div className="transform rounded-2xl bg-white bg-opacity-10 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:p-8">
            <h2 className="mb-4 font-semibold text-2xl text-yellow-400 sm:text-3xl">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg">
              While I mention a{" "}
              <span className="font-semibold text-pink-500">Contact Page</span>,
              it&apos;s important to note that it doesn't actually exist... yet!
              🎉
            </p>
            <p className="mt-4 text-base sm:text-lg">
              But here&apos;s something fun: if you try to navigate to any
              non-existing page, like the Contact page, you'll get redirected to
              a custom{" "}
              <span className="font-semibold text-yellow-400">
                404 Error Page
              </span>
              —an exclusive feature built into this platform. It helps you
              quickly understand when a route doesn&apos;t exist, keeping your
              browsing experience smooth.
            </p>
            <p className="mt-4 text-base sm:text-lg">
              Try it out by clicking on the &quot;Contact&quot; button above and
              discover the 404 page in action!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
