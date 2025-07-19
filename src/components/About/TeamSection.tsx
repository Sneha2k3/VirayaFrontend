import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { josefin } from '@/utils/font';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8Mg%3D%3D",
      bio: "20+ years of experience in Rudraksha authentication and spiritual practices",
      facebook: "#",
      instagram: "#",
      expertise: ["Authentication", "Business Strategy", "Spiritual Practices"]
    },
    {
      name: "Maya Sharma",
      role: "Head of Sourcing",
      image: "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8Mg%3D%3D",
      bio: "Expert in sustainable farming practices and community development",
      facebook: "#",
      instagram: "#",
      expertise: ["Sustainable Farming", "Community Relations", "Supply Chain"]
    },
    {
      name: "John Mitchell",
      role: "Quality Assurance Director",
      image: "https://images.unsplash.com/photo-1630910561339-4e22c7150093?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDI%3D",
      bio: "Leading expert in Rudraksha authentication and grading",
      facebook: "#",
      instagram: "#",
      expertise: ["Quality Control", "Product Grading", "Authentication"]
    },
    {
      name: "Priya Patel",
      role: "Community Relations Manager",
      image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDI%3D",
      bio: "Specializes in farmer relations and social initiatives",
      facebook: "#",
      instagram: "#",
      expertise: ["Community Building", "Social Impact", "Farmer Relations"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`lg:text-5xl text-3xl font-bold ${josefin.className} text-primary mb-6`}>
            The Visionaries Behind Our Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the experts who ensure the authenticity and quality of every Rudraksha bead while fostering sustainable communities
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="relative group"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="transform transition-transform duration-300 translate-y-8 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary-200 font-medium mb-3">{member.role}</p>
                    
                    {/* Bio - Only visible on hover */}
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        animate={{ y: hoveredMember === index ? 0 : 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.bio}
                      </motion.p>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links - Hidden until hover */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                      {[
                        { Icon: FaFacebook, href: member.facebook },
                        { Icon: FaInstagram, href: member.instagram }
                      ].map(({ Icon, href }, i) => (
                        <Button
                          key={i}
                          isIconOnly
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                          size="sm"
                          as="a"
                          href={href}
                        >
                          <Icon className="text-white" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;