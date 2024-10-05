"use client";

import { Home, Info, MessageCircle } from "lucide-react";
import Link from "next/link";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 tracking-wide"
            >
              Diwali Luxe
            </Link>
            <div className="flex items-center space-x-8">
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
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center h-screen space-y-12 px-4 text-center">
        <div className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-md">
          About Diwali Luxe
        </div>
        <div className="max-w-3xl text-lg leading-relaxed tracking-wide text-white/80">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-yellow-400">Diwali Luxe</span>,
            a luxury platform for all things Diwali. We bring you the finest in
            decor, gifts, and experiences to make your celebration
            extraordinary. Discover our curated collection that perfectly blends
            tradition and elegance for this joyous festival. And yeah the competition
            website for <span className="font-semibold text-yellow-400">IEEE</span>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12 w-full max-w-6xl px-4">
          <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-md shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-yellow-400">
              Tech Stack
            </h2>
            <ul className="space-y-2 text-lg">
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

          <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-md shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-yellow-400">
              Features
            </h2>
            <ul className="space-y-2 text-lg">
              <li>- Stunning Visuals</li>
              <li>- Fast and Lightweight</li>
              <li>- Responsive Design</li>
              <li>- Smooth Animations</li>
              <li>- 4k Image Quality</li>
              <li>- 99.9% User Experience</li>
              <li>- 99.9% Uptime</li>
            </ul>
          </div>

          <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-md shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-yellow-400">
              Get in Touch
            </h2>
            <p className="text-lg">
              While I mention a{" "}
              <span className="font-semibold text-pink-500">Contact Page</span>,
              it&apos;s important to note that it doesn’t actually exist... yet!
              🎉
            </p>
            <p className="text-lg mt-4">
              But here&apos;s something fun: if you try to navigate to any
              non-existing page, like the Contact page, you’ll get redirected to
              a custom{" "}
              <span className="font-semibold text-yellow-400">
                404 Error Page
              </span>
              —an exclusive feature built into this platform. It helps you
              quickly understand when a route doesn&apos;t exist, keeping your
              browsing experience smooth.
            </p>
            <p className="text-lg mt-4">
              Try it out by clicking on the &quot;Contact&quot; button above and
              discover the 404 page in action!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
