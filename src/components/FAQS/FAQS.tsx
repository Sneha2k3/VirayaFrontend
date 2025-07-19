"use client"
import SharedTitle from '@/shared/SharedTitle/SharedTitle';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion } from 'framer-motion';
import Image from 'next/image';

const FAQS = () => {
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
          alt="Ceramic FAQs Banner"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center text-center">
          <div className="text-white">
            <motion.h1 className="text-5xl font-bold" {...fadeInUp}>
              Frequently Asked Questions
            </motion.h1>
            <motion.h1 className="text-4xl font-bold mb-3">
              (FAQs)
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <div className='lg:px-8 lg:py-7 px-8'>
              <SharedTitle title="Frequently Asked Questions" classname="text-4xl" />
            </div>
            <p className="text-gray-600">Find answers to common questions about customizing and ordering your ceramics</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Accordion
              className="!text-black [&_button]:text-black [&_p]:text-black"
              itemClasses={{
                title: "text-gray-800",
                content: "text-black"
              }}
            >
              <AccordionItem key="1" title="Can I customize the shape of a ceramic item?">
                Currently, you can only customize the surface design of pre-defined ceramic shapes such as mugs, plates, and bowls. Shape customization is not available.
              </AccordionItem>

              <AccordionItem key="2" title="How does the 3D customization tool work?">
                The 3D tool lets you rotate the ceramic item and apply surface designs like colors, patterns, and text in real time. Changes appear instantly as you make them.
              </AccordionItem>

              <AccordionItem key="3" title="Do I need to create an account to place an order?">
                Yes, creating an account helps you save designs, track your orders, and view past purchases. It also enables faster checkout on future orders.
              </AccordionItem>

              <AccordionItem key="4" title="Can I preview my customized design before checkout?">
                Absolutely. You can fully view and rotate your customized product in 3D before adding it to the cart or proceeding to payment.
              </AccordionItem>

              <AccordionItem key="5" title="What if I make a mistake while customizing?">
                You can reset your design anytime before checkout. If you've already placed the order, reach out to our support team within 2 hours to request changes.
              </AccordionItem>

              <AccordionItem key="6" title="Which devices can I use to customize my product?">
                Vitraya is optimized for desktops, tablets, and mobile devices. However, for the best 3D customization experience, we recommend using a desktop or tablet.
              </AccordionItem>

              <AccordionItem key="7" title="What payment methods are accepted?">
                We accept all major payment methods including credit/debit cards, digital wallets, and UPI (for supported regions).
              </AccordionItem>

              <AccordionItem key="8" title="Can I track my order after purchase?">
                Yes. After placing your order, you can track the delivery status from your account dashboard under the 'My Orders' section.
              </AccordionItem>

              <AccordionItem key="9" title="Do you ship internationally?">
                Currently, we only ship within Nepal. International shipping options will be available soon.
              </AccordionItem>

              <AccordionItem key="10" title="How long does it take to receive my customized product?">
                Orders are typically processed and delivered within 5–7 working days. You’ll receive updates via email or dashboard notifications.

              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQS;
