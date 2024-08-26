import companyLogoWhite from "../../../public/logo-white.svg";
import facebookLogo from "../../../public/icon-facebook.svg";
import youtubeLogo from "../../../public/icon-youtube.svg";
import twitterLogo from "../../../public/icon-twitter.svg";
import pinterestLogo from "../../../public/icon-pinterest.svg";
import instagramLogo from "../../../public/icon-instagram.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-blue-900">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        {/* Logo and social as container */}
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright © 2022, All Rights Reserved
          </div>
          {/* Logo */}
          <div>
            <Image src={companyLogoWhite} className="h-8" alt="" />
          </div>
          {/* Social as Container */}
          <div className="flex justify-center space-x-4">
            {/* a 1 */}
            <a href="#">
              <Image src={facebookLogo} className="h-8" alt="" />
            </a>
            {/* a 2 */}
            <a href="#">
              <Image src={youtubeLogo} className="h-8" alt="" />
            </a>
            {/* a 3 */}
            <a href="#">
              <Image src={twitterLogo} className="h-8" alt="" />
            </a>
            {/* a 4 */}
            <a href="#">
              <Image src={pinterestLogo} className="h-8" alt="" />
            </a>
            {/* a 5 */}
            <a href="#">
              <Image src={instagramLogo} className="h-8" alt="" />
            </a>
          </div>
        </div>
        {/* List Container */}
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <a href="#" className="hover:text-brightRed">
              Home
            </a>
            <a href="#" className="hover:text-brightRed">
              Pricing
            </a>
            <a href="#" className="hover:text-brightRed">
              Products
            </a>
            <a href="#" className="hover:text-brightRed">
              About
            </a>
          </div>
          <div className="flex flex-col space-y-3 text-white">
            <a href="#" className="hover:text-brightRed">
              Careers
            </a>
            <a href="#" className="hover:text-brightRed">
              Community
            </a>
            <a href="#" className="hover:text-brightRed">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Input Container */}
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full focus:outline-none"
                placeholder="Updated in your inbox"
              />
              <button className="px-6 py-2 text-white rounded-full bg-blue-400 hover:bg-blue-200 focus:outline-none">
                Go
              </button>
            </div>
          </form>
          <div className="hidden text-white md:block">
            Copyright © 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
