import avatarAnisha from "../../../public/avatar-anisha.png";
import avatarAli from "../../../public/avatar-ali.png";
import avatarRichard from "../../../public/avatar-richard.png";
import Image from "next/image";

const Testimonial = () => {
  return (
    <section id="testimonials">
      {/* Container to heading and testm blocks */}
      <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          Why People Love Task Box?
        </h2>
        {/* Testimonials Container */}
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          {/* Testimonial 1 */}
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3">
            <Image src={avatarAnisha} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Zara Richard</h5>
            <p className="text-sm text-darkGrayishBlue">
              “Task Box has transformed how I manage my day. Focusing on just
              three tasks helps me stay on track and feel accomplished every
              day.”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
            <Image src={avatarAli} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Alia Matthew</h5>
            <p className="text-sm text-darkGrayishBlue">
              “With Task Box, my productivity has skyrocketed. The simple act of
              prioritizing and time-boxing my top tasks has eliminated the chaos
              from my schedule.”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
            <Image src={avatarRichard} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Ricky Norman</h5>
            <p className="text-sm text-darkGrayishBlue">
              “Task Box makes my workday so much smoother. The calendar view,
              showing exactly when I’ll tackle my top priorities, keeps me
              focused and stress-free.”
            </p>
          </div>
        </div>
        {/* Button */}
        <div className="my-16">
          <a
            href="#"
            className="p-3 px-6 pt-2 text-white bg-blue-400 rounded-full baseline hover:bg-brightRedLight"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
