"use client"
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { 
  FaClock, 
  FaMedal, 
  FaUsers, 
  FaComments
} from "react-icons/fa";
import Image from 'next/image';
import SharedTitle from '@/shared/SharedTitle/SharedTitle';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FadeInUpAnimation {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: { duration: number };
}

const ConsultationPage: React.FC = () => {
  const fadeInUp: FadeInUpAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const benefits: Benefit[] = [
    {
      icon: <FaMedal size={24} />,
      title: "Expert Guidance",
      description: "Get advice from certified Rudraksha experts with years of experience"
    },
    {
      icon: <FaUsers size={24} />,
      title: "Personalized Approach",
      description: "Receive customized suggestions based on your specific needs"
    },
    {
      icon: <FaComments size={24} />,
      title: "Detailed Documentation",
      description: "Get written recommendations and care instructions"
    },
    {
      icon: <FaClock size={24} />,
      title: "Flexible Scheduling",
      description: "Book consultations at your convenience"
    }
  ];

  return (
    <div className="w-full">
      <motion.div 
        className="relative h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1650809652995-85581c240f19?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Consultation banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="max-w-2xl ml-12 text-white">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              {...fadeInUp}
            >
              Expert Rudraksha Consultation
            </motion.h1>
            <motion.p 
              className="text-xl"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Begin your spiritual journey with personalized guidance from our experts
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold text-black">Book Your Consultation</p>
                <p className="text-small text-gray-500">Select a time that works for you</p>
              </div>
            </div>
            {/* Cal.com embed taking full width and height */}
            <div className="w-full h-[600px]">
              <iframe
                src="https://cal.com/khandbarirudraksha"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Why Choose Our Consultation?</h2>
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-500">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="w-full mt-34">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-black">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our consultation services</p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <Accordion 
              className="!text-black [&_button]:text-black [&_p]:text-black"
              itemClasses={{
                title: "text-gray-800",
                content: "text-black"
              }}
            >
              <AccordionItem key="1" title="What is the consultation process like?">
                Our consultation process begins with you selecting a time slot that works for you. Our experts will meet with you at the scheduled time for a personalized session.
              </AccordionItem>
              <AccordionItem key="2" title="How long does a consultation session last?">
                A typical consultation session lasts between 30-45 minutes. This gives us enough time to understand your needs and provide detailed recommendations.
              </AccordionItem>
              <AccordionItem key="3" title="Do you offer online consultations?">
                Yes, we offer both online and in-person consultations. Online consultations are conducted via video call at a time convenient for you.
              </AccordionItem>
              <AccordionItem key="4" title="What should I prepare before the consultation?">
                It&apos;s helpful to have any specific questions or concerns written down, and if you have any existing Rudraksha beads, please have them ready for discussion.
              </AccordionItem>
              <AccordionItem key="5" title="What happens after the consultation?">
                You&apos;ll receive a detailed report with recommendations and next steps, along with care instructions and guidelines for your spiritual practice.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="w-full lg:h-[80vh] h-[70vh] lg:px-24 px-4 mb-12">
        <SharedTitle title="Visit Us At" classname='lg:text-5xl text-3xl'/>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3542.4569905908816!2d87.2120599!3d27.392668999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e8c7002a48f253%3A0x879bd1fd194f42c3!2sSankhuwasabha%20khandbari!5e0!3m2!1sen!2snp!4v1736881633500!5m2!1sen!2snp" 
          width="100%"
          height="100%"
          style={{border:"none",outline:"none"}}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ConsultationPage;