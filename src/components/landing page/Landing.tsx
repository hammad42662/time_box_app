import CallToAction from "./CallToAction";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Testimonial from "./Testimonial";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </>
  );
}
