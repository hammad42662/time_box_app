"use client";
import { useState } from "react";
import logo from "../../../public/task-box-logo.png";
import Image from "next/image";
import Link from "next/link";
const navElements = [
  { name: "Pricing", link: "" },
  { name: "Product", link: "" },
  { name: "About Us", link: "" },
  { name: "Careers", link: "" },
  { name: "Community", link: "" },
];
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLogo />
        {/* Menu Items */}
        <MenuItems />
        {/* Hamburger Icon */}
        <Hamburger toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu toggleMenu={toggleMenu} />
    </nav>
  );
}

function MobileMenu({ toggleMenu }: any) {
  return (
    <div className="md:hidden">
      <ul
        className={
          toggleMenu
            ? "absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
            : "hidden"
        }
      >
        {navElements.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
        <li>
          {" "}
          <Link
            href="/login"
            className=" p-3 px-6 pt-2 text-white bg-blue-500 rounded-full baseline hover:bg-blue-900 block "
          >
            Login/ Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}
function Hamburger({ toggleMenu, setToggleMenu }: any) {
  return (
    <>
      <button
        className={
          toggleMenu
            ? "open block hamburger md:hidden focus:outline-none"
            : "block hamburger md:hidden focus:outline-none"
        }
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
    </>
  );
}

function MenuItems() {
  return (
    <>
      <ul className="hidden space-x-6 md:flex">
        {navElements.map((item, index) => (
          <li key={index} className="hover:text-darkGrayishBlue">
            <a href="#" className="hover:text-darkGrayishBlue">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/login"
        className=" p-3 px-6 pt-2 text-white bg-blue-500 rounded-full baseline hover:bg-blue-900 hidden md:block "
      >
        Login/ Signup
      </Link>
    </>
  );
}
function NavLogo() {
  return (
    <Link href="/" className="">
      <Image src={logo} className=" w-36 h-full" alt="" />
    </Link>
  );
}
