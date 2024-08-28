import Image from "next/image";
import heroIllistration from "../../../../public/hero_illus.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        {/* Left Item */}
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            Take Control with Task Box
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Effortlessly manage your tasks using the Time Boxing technique.
            Boost productivity, stay focused, and make every minute count.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/login"
              className="p-3 px-6 pt-2 text-white bg-blue-600 rounded-full baseline hover:bg-brightRedLight"
            >
              Get Started with Task Box
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="md:w-1/2">
          <Image className=" rounded-full" src={heroIllistration} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
