const Features = () => {
  return (
    <section id="features">
      {/* Flex Container */}
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
        {/* What's Different */}
        <div className="flex flex-col space-y-12 md:w-1/2">
          <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
            What&apos;s Different About Task Box?{" "}
          </h2>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Task Box streamlines your productivity by embracing the simplicity
            and power of the Time Boxing technique. Our app is designed to help
            you focus on what truly matters, making your day more efficient and
            stress-free. Whether you&apos;re managing daily tasks or aligning
            with bigger goals, Task Box keeps you on track without the
            overwhelm.
          </p>
        </div>

        {/* Numbered List */}
        <div className="flex flex-col space-y-8 md:w-1/2">
          {/* List Item 1 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-blue-500 md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-500">
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Prioritize with Purpose
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Prioritize with Purpose
              </h3>
              <p className="text-darkGrayishBlue">
                Brain dump your tasks and highlight the three that matter most.
                By focusing on just three key tasks each day, you ensure your
                energy is spent on what&apos;s truly important, leading to
                higher productivity and less burnout.
              </p>
            </div>
          </div>

          {/* List Item 2 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-blue-500 md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-500">
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Visualize Your Day
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Visualize Your Day
              </h3>
              <p className="text-darkGrayishBlue">
                See your tasks come to life in a calendar view, where each of
                your three priority tasks is time-boxed for maximum efficiency.
                This clear, visual approach helps you maintain focus and ensures
                you never lose sight of your daily goals.
              </p>
            </div>
          </div>

          {/* List Item 3 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-blue-500  md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-500">
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Boost Your Productivity
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Boost Your Productivity
              </h3>
              <p className="text-darkGrayishBlue">
                Task Box isn&apos;t just about getting things done—it&apos;s
                about doing them better. By limiting your focus to three
                priority tasks, you reduce decision fatigue, avoid
                procrastination, and finish your day with a genuine sense of
                accomplishment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
