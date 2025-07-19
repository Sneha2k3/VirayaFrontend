// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { Divider } from "@nextui-org/react";
// import { 
//   FaHeart, 
//   FaUsers, 
//   FaMedal, 
//   FaLeaf, 
//   FaBook,
//   FaSeedling,
//   FaGraduationCap,
//   FaClinicMedical,
//   FaCheckCircle,
// } from "react-icons/fa";
// import CountUp from 'react-countup';
// import { josefin } from '@/utils/font';
// import SharedTitle from '@/shared/SharedTitle/SharedTitle';


// const About = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

// const stats = [
//   { icon: <FaUsers size={24} />, number: 10000, suffix: "+", label: "Customers Served" },
//   { icon: <FaLeaf size={24} />, number: 100, suffix: "+", label: "Farming Families" },
//   { icon: <FaBook size={24} />, number: 15, suffix: "+", label: "Years Experience" },
//   { icon: <FaHeart size={24} />, number: 5, suffix: "%", label: "To Social Causes" }
// ];

// const socialInitiatives = [
//   { 
//     icon: <FaGraduationCap size={24} />, 
//     title: "Education Support",
//     description: "Providing education for farmers' children"
//   },
//   { 
//     icon: <FaSeedling size={24} />, 
//     title: "Sustainable Farming",
//     description: "Implementing eco-friendly farming practices"
//   },
//   { 
//     icon: <FaClinicMedical size={24} />, 
//     title: "Healthcare Access",
//     description: "Supporting medical facilities in farming communities"
//   }
// ];

"use client";
import SharedTitle from '@/shared/SharedTitle/SharedTitle';
import { josefin } from '@/utils/font';
import { Divider } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CountUp from 'react-countup';
import { FaCheckCircle } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stats = [
  { number: 12, suffix: "+", label: "Years of Crafting", icon: <FaCheckCircle /> },
  { number: 500, suffix: "+", label: "Designs Created", icon: <FaCheckCircle /> },
  { number: 1200, suffix: "+", label: "Happy Customers", icon: <FaCheckCircle /> },
  { number: 20, suffix: "+", label: "Craft Fairs Participated", icon: <FaCheckCircle /> },
];

const socialInitiatives = [
  {
    icon: <FaCheckCircle />,
    title: "Local Artisan Support",
    description: "We empower local ceramic artists by providing fair wages and showcasing their work.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Eco-Friendly Materials",
    description: "Committed to using sustainable clay, lead-free glazes, and biodegradable packaging.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Community Workshops",
    description: "Hosting free ceramic classes to nurture creativity in local youth.",
  },
];

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <motion.div
        className="relative h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600181953605-5d178c1eebc3?auto=format&fit=crop&w=1470&q=80"
          alt="Ceramic Studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="max-w-3xl lg:px-16 px-4 lg:ml-12 ml-4 text-white">
            <motion.h1
              className="lg:text-5xl text-3xl font-bold mb-6"
              {...fadeInUp}
            >
              Our Journey in Clay
            </motion.h1>
            <motion.p
              className="text-xl"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Handcrafting beauty, one ceramic piece at a time
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className={`max-w-7xl mx-auto px-4 pt-16 space-y-12 ${josefin.className}`}>
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          {...fadeInUp}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md py-4">
              <div className="text-center overflow-visible py-2">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={stat.number} duration={2.5} />
                  {stat.suffix}
                </div>
                <p className="text-default-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Our Story Section */}
        <motion.div {...fadeInUp}>
          <div className='bg-white rounded-md shadow-sm px-8 py-2'>
            <div className="py-4">
              <div className="flex gap-3">
                <div>
                  <p className={`text-3xl text-primary ${josefin.className}`}>Our Story</p>
                  <p className="text-default-500">Rooted in passion, shaped by hands</p>
                </div>
              </div>
            </div>
            <Divider />
            <div className='text-black py-6'>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="https://images.unsplash.com/photo-1565696952182-bfe4a8ab5737?auto=format&fit=crop&w=1470&q=80"
                    alt="Our Ceramic Studio"
                    width={600}
                    height={400}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg">
                    Our journey began in a small pottery workshop, where each piece was molded by hand and fired with care. What started as a hobby quickly turned into a full-fledged ceramic studio loved by hundreds.
                  </p>
                  <p className="text-lg">
                    We take pride in preserving traditional techniques while blending them with modern aesthetics. Every creation reflects the harmony of form and function, rooted in mindfulness and love for clay.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Locally sourced clay and glazes",
                      "Hand-thrown and hand-painted pieces",
                      "Eco-conscious production",
                      "Support for women artisans",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className='text-primary' />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Impact Section */}
        <motion.div {...fadeInUp}>
          <div className="rounded-sm shadow-sm">
            <SharedTitle title="Our Social Impact" classname="text-4xl font-medium text-primary" />
            <div className="px-6 flex items-center justify-center">
              <div className="space-y-6">
                <p className="text-lg">
                  We are committed to making a difference through our craft. Our social programs focus on:
                </p>
                <div className="space-y-4">
                  {socialInitiatives.map((initiative, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                        {initiative.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{initiative.title}</h3>
                        <p className="text-default-500">{initiative.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Awards Section */}
        {/* <motion.div {...fadeInUp}>
          <SharedTitle title="Recognition and Awards" classname="text-4xl font-medium text-primary" />
          <div className="px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  img: "/award1.jpeg",
                  title: "Craft Excellence Award",
                  description: "Recognized for unique design and excellence in handmade ceramics.",
                },
                {
                  img: "/award2.jpeg",
                  title: "Sustainable Artistry Honor",
                  description: "Awarded for commitment to environmentally conscious ceramic production.",
                },
              ].map((award, index) => (
                <div key={index} className="w-full flex flex-col rounded-sm">
                  <div className='w-full h-[400px] mb-8'>
                    <Image src={award.img} alt="award" height={1000} width={1000} className='w-full h-full object-cover rounded-lg' />
                  </div>
                  <div className="flex gap-2 w-full">
                    <div className="w-12 h-12 aspect-square rounded-full flex items-center justify-center bg-white text-primary">
                      <FaMedal size={22} className="w-full h-full p-2" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                      <p className="text-default-500">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default AboutUs;

