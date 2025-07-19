// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import SharedTitle from '@/shared/SharedTitle/SharedTitle';

// const Terms = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 },
//   };

//   return (
//     <div className="w-full">
//       <motion.div
//         className="relative h-[280px] overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Image
//           src="https://images.unsplash.com/photo-1650809652995-85581c240f19?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Terms and Conditions banner"
//           layout="fill"
//           objectFit="cover"
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
//           <div className="text-white">
//             <motion.h1 className="lg:text-5xl text-3xl font-bold mb-6" {...fadeInUp}>
//               Terms and Conditions
//             </motion.h1>
//           </div>
//         </div>
//       </motion.div>
//       <div className="lg:px-20 px-4 py-7">
//         <SharedTitle title="Terms and Conditions" classname="text-4xl" />
//         <div className="mt-4 text-right text-gray-600">
//           <p>Last Updated: March 4, 2025</p>
//         </div>
//         <div className="flex flex-col gap-8 leading-8 mt-6">
//           <div>
//             <p>Welcome to Khadbari Rudraksha! By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before making any purchase or using our services.</p>
//           </div>
//           <div className="flex flex-col gap-4">
//             <h1 className="text-2xl font-semibold">1. Introduction</h1>
//             <p>Khadbari Rudraksha is committed to providing high-quality, authentic rudraksha beads directly sourced from farmers. Our platform ensures fair pricing and supports social impact initiatives. By using our website, you acknowledge and agree to comply with the terms outlined below.</p>
            
//             <h1 className="text-2xl font-semibold">2. Eligibility</h1>
//             <p>By using this website, you confirm that you are at least 18 years old or have the permission of a legal guardian to make a purchase. You also agree that the information you provide is accurate and complete.</p>
            
//             <h1 className="text-2xl font-semibold">3. Product Authenticity</h1>
//             <p>We guarantee that all our rudraksha beads are genuine and sourced responsibly. However, as rudraksha is a natural product, slight variations in size, shape, and color may occur.</p>
            
//             <h1 className="text-2xl font-semibold">4. Orders and Payments</h1>
//             <ul className="list-disc pl-6 mt-2">
//               <li>Orders can be placed through our website following the outlined steps.</li>
//               <li>Full payment must be made at the time of purchase through our accepted payment methods.</li>
//               <li>We reserve the right to cancel or refuse any order due to unforeseen circumstances, such as stock unavailability or pricing errors.</li>
//             </ul>
            
//             <h1 className="text-2xl font-semibold">5. Shipping and Delivery</h1>
//             <ul className="list-disc pl-6 mt-2">
//               <li>We aim to process and ship orders promptly. Delivery times may vary depending on your location and external factors.</li>
//               <li>Any customs duties or taxes imposed by local authorities are the buyer&apos;s responsibility.</li>
//               <li>We are not liable for delays caused by courier services or other third parties.</li>
//             </ul>
            
//             <h1 className="text-2xl font-semibold">6. Returns and Refunds</h1>
//             <ul className="list-disc pl-6 mt-2">
//               <li>If you receive a defective or incorrect product, please contact us within 7 days of delivery for a resolution.</li>
//               <li>Returns must be in unused condition, with original packaging and proof of purchase.</li>
//               <li>Refunds or exchanges will be processed based on our inspection of the returned item.</li>
//             </ul>
            
//             <h1 className="text-2xl font-semibold">7. User Conduct</h1>
//             <p>By using our website, you agree not to:</p>
//             <ul className="list-disc pl-6 mt-2">
//               <li>Engage in fraudulent or unlawful activities.</li>
//               <li>Violate any intellectual property rights related to our content.</li>
//               <li>Disrupt or compromise the security of our platform.</li>
//             </ul>
            
//             <h1 className="text-2xl font-semibold">8. Privacy Policy</h1>
//             <p>Your personal information is handled in accordance with our Privacy Policy, which outlines how we collect, use, and protect your data.</p>
            
//             <h1 className="text-2xl font-semibold">9. Limitation of Liability</h1>
//             <p>Khadbari Rudraksha is not responsible for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
            
//             <h1 className="text-2xl font-semibold">10. Changes to Terms and Conditions</h1>
//             <p>We may update these Terms and Conditions periodically. Continued use of our website after changes are posted constitutes acceptance of the new terms.</p>
            
//             <h1 className="text-2xl font-semibold">11. Governing Law</h1>
//             <p>These Terms and Conditions are governed by the laws of Nepal. Any disputes will be resolved in accordance with Nepalese legal jurisdiction.</p>
            
//             <h1 className="text-2xl font-semibold">12. Contact Information</h1>
//             <p>For any questions or concerns regarding these terms, please contact us at <a href="mailto:Khandbarirudraksha@gmail.com" target='_blank' className="text-blue-600 hover:underline">Khandbarirudraksha@gmail.com</a>.</p>
//           </div>
          
//           <div className="mt-8 border-t pt-6">
//             <p className="font-medium">
//               By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Terms;