// // components/NabilPayment.tsx
// "use client";
// import React, { useEffect } from 'react';
// import Script from 'next/script';

// interface NabilPaymentProps {
//   onPaymentComplete: (token: string) => void;
//   amount: number;
// }

// declare global {
//   interface Window {
//     Norbr: any;
//   }
// }

// const NabilPayment = ({ onPaymentComplete, amount }: NabilPaymentProps) => {
//   useEffect(() => {
//     const initializePayment = () => {
//       if (window.Norbr) {
//         const configuration = {
//           publicapikey: process.env.NEXT_PUBLIC_NABIL_API_KEY,
//           locale: "en",
//           environment: "production",
//           tokentype: "oneshot",
//           paymentmethods: JSON.stringify({
//             payment_methods_available: [{
//               name: "mastercard",
//               component_type: "card",
//               required_fields: ["token", "amount", "currency"],
//               form_fields: [
//                 {
//                   name: "card_number",
//                   display_name: "card_number",
//                   data_type: "integer",
//                   enum: "",
//                   example: "5436 xxxx xxxx xxxx"
//                 },
//                 {
//                   name: "cvc",
//                   display_name: "cvc",
//                   data_type: "integer",
//                   enum: "",
//                   example: "123"
//                 }
//               ],
//               countries: ["all"],
//               logo: "visa.svg"
//             }]
//           }),
//           displayButtons: true,
//           displayCardHolder: true,
//           displaySave: false,
//           onSubmit: (response: any) => {
//             if (response.token) {
//               onPaymentComplete(response.token);
//             }
//           }
//         };

//         new window.Norbr(configuration);
//       }
//     };

//     const timer = setTimeout(initializePayment, 1000);
//     return () => clearTimeout(timer);
//   }, [onPaymentComplete]);

//   return (
//     <div className="w-full space-y-4">
//       <Script 
//         src="https://secure-assets.norbr.io/javascript/x.x/norbr-client.min.js"
//         strategy="beforeInteractive"
//       />
//       <link 
//         rel="stylesheet" 
//         href="https://secure-assets.norbr.io/stylesheet/x.x/norbr-client.min.css" 
//       />
      
//       <div id="norbr-payment-container" className="w-full min-h-[200px] border rounded-lg p-4" />
      
//       <style jsx global>{`
//         .norbr-input {
//           border: 1px solid #e2e8f0;
//           border-radius: 0.375rem;
//           padding: 0.5rem 1rem;
//           width: 100%;
//           margin-bottom: 1rem;
//         }
        
//         .norbr-button {
//           background-color: #3b82f6;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 0.375rem;
//           width: 100%;
//           cursor: pointer;
//         }
        
//         .norbr-error {
//           color: #ef4444;
//           font-size: 0.875rem;
//           margin-top: 0.25rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NabilPayment;