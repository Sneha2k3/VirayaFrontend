"use client";
import SharedTitle from '@/shared/SharedTitle/SharedTitle';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Policy = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="w-full">
      <motion.div
        className="relative h-[280px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1650809652995-85581c240f19?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Consultation banner"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <div className="text-white">
            <motion.h1
              className="lg:text-5xl text-3xl font-bold mb-6"
              {...fadeInUp}
            >
              Privacy and Policy
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <div className="lg:px-20 lg:py-7 px-4 py-4">
        <SharedTitle title="Our Values and Policies" classname="text-4xl" />
        <div className="flex flex-col gap-8 leading-8">
          <div>
            <p>
              At our ceramic studio, we are passionate about creating high-quality, handcrafted ceramic pieces that celebrate both function and beauty. Our products are made with care, reflecting a deep appreciation for craftsmanship, sustainability, and timeless design. Whether it's mugs, plates, vases, or decor, each item carries a unique story rooted in tradition and artistic expression.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Our Offerings</h1>
            <ul className="list-inside list-disc">
              <li>Handmade ceramic mugs, bowls, plates, and home decor.</li>
              <li>Small-batch creations, ensuring quality and uniqueness.</li>
              <li>Custom orders for gifting and special occasions.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Quality & Sustainability</h1>
            <ul className="list-inside list-disc">
              <li>Each piece is crafted with durable, food-safe materials.</li>
              <li>We use eco-friendly packaging to reduce waste.</li>
              <li>Our studio follows mindful production practices to minimize environmental impact.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Privacy & Customer Care</h1>
            <ul className="list-inside list-disc">
              <li>We respect your privacy and never share your personal information without consent.</li>
              <li>All payments are processed securely, and your data is protected.</li>
              <li>We offer easy returns or exchanges within 7 days for unused items.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Get in Touch</h1>
            <p>
              For questions, custom orders, or collaborations, feel free to email us at:{" "}
              <a href="mailto:hello@ceramicstudio.com" className="text-blue-600 hover:underline">
                vitraya264@gmail.com
              </a>
            </p>
            <p>We’re here to make your ceramic experience personal and delightful.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
