// import SharedTitle from '@/shared/SharedTitle/SharedTitle'
// import { josefin } from '@/utils/font'
// import Image from 'next/image'
// import React from 'react'

// const ChooseUs = () => {
//     const data=[
//         {
//             id:1,
//             title:"Best Quality",
//             img:"/quality.png"
//         },
//         {
//             id:2,
//             title:"Lab Tested & Certified",
//             img:"/lab.png"
//         },
//         {
//             id:3,
//             title:"Worldwide Shipping",
//             img:"/shipping.png"
//         },
//         {
//             id:4,
//             title:"Directly from the Farmers",
//             img:"/farmers.png"
//         },
//         {
//             id:5,
//             title:"Secured Payment",
//             img:"/secured.png"
//         }
//     ]
//     return (
//         <div className='w-full lg:px-16 px-4 py-4'>
//             <SharedTitle title='Why Should You Choose Us?'/>
//             <div className='grid grid-cols-3 place-items-center place-content-center gap-x-8 gap-y-8'>
//                 {data.map(item=>(
//                     <div key={item.id} className='flex items-center justify-center flex-col gap-2'>
//                         <div className='size-24'>
//                             <Image className='object-cover h-full w-full' src={item.img} alt={item.title} height={1000} width={1000} loading='lazy'/>
//                         </div>
//                         <h1 className={`${josefin.className} lg:text-2xl text-lg mt-2 text-primary`}>{item.title}</h1>
//                     </div>
//             ))}
//             </div>
//         </div>
//     )
// }

// export default ChooseUs
