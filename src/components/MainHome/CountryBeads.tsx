// "use client"
// import SharedTitle from '@/shared/SharedTitle/SharedTitle'
// import { Button, Tab, Tabs } from '@nextui-org/react'
// import React, { Key, useState } from 'react'
// import Image from 'next/image'
// import { useQuery } from '@tanstack/react-query'
// import { getByCountry } from '@/services/products'
// import Loader from '@/shared/Loader'
// import Link from 'next/link'

// const CountryBeads = () => {
//     const [selectedCountry, setSelectedCountry] = useState("Nepal")

//     const { data: countryData,isLoading } = useQuery({
//         queryKey: ['countryData', selectedCountry],
//         queryFn: () => getByCountry(selectedCountry)
//     })

//     const handleTabChange = (key:Key) => {
//         setSelectedCountry(String(key))
//     }

//     const descriptions = {
//         Nepal: "Nepalese rudraksha beads are renowned for their larger size, round or oval shape, and deep, well-defined mukhi lines, symbolizing purity and spiritual power. Sourced from the sacred Himalayan region, these beads are considered highly potent for meditation and spiritual growth. Known for their coarser texture and strong energy, they are ideal for individuals seeking enhanced focus, peace, and enlightenment. Nepal also produces rare varieties like the Gauri Shankar Rudraksha, which symbolizes unity and harmony.",
//         Indonesia: "Indonesian rudraksha beads are smaller, smoother, and lightweight, with finer mukhi lines that give them a polished appearance. They are widely appreciated for their versatility and suitability for daily wear as jewelry or malas. While smaller in size, these beads still carry potent spiritual energy, making them a popular choice for subtle energy balancing and meditation. Their affordability and accessibility make Indonesian rudraksha beads ideal for those seeking continuous spiritual benefits in a more contemporary form."
//     }

//     if(isLoading)return <Loader/>

//     return (
//         <div className='w-full'>
//             <SharedTitle title='Exclusively From Us'/>
//             <div className='w-full my-8 -mt-4 flex flex-col lg:px-16 px-4 items-center justify-center'>
//                 <Tabs
//                     key="tabs"
//                     className='mb-4'
//                     variant="underlined"
//                     aria-label="Country tabs"
//                     onSelectionChange={handleTabChange}
//                     classNames={{
//                         cursor: "group-data-[selected=true]:bg-primary",
//                         tabContent: "group-data-[selected=true]:text-primary text-2xl"
//                     }}
//                 >
//                     <Tab key="Nepal" title="Nepal">
//                         <h1 className='text-justify'>{descriptions.Nepal}</h1>
//                         <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 my-8'>
//                             {countryData?.products?.filter((item:any) => item.country === "Nepal").map((item:any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
//                                 <div key={item._id} className='mb-4 w-full bg-white flex flex-col shadow-sm'>
//                                     <div className='h-[200px] w-full'>
//                                         <Image
//                                             src={item.img[0]}
//                                             alt={item.title}
//                                             height={1000}
//                                             width={1000}
//                                             className='object-cover w-full h-full'
//                                         />
//                                     </div>
//                                     <div className='px-4 py-4 flex gap-2 items-center justify-between'>
//                                         <h1 className='font-semibold'>{item.title}</h1>
//                                         <div className='bg-primary text-sm rounded-2xl text-white px-4 py-1'>
//                                             <p>{item.size}</p>
//                                         </div>
//                                     </div>

//                                     <div className='flex items-center justify-center cursor-pointer mb-4'>
//                                         <Link href={`/rudraksha/${item?._id}`}>
//                                             <h1 className='font-medium text-primary text-sm underline underline-offset-2'>
//                                                 View Details
//                                             </h1>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Tab>
//                     <Tab key="Indonesia" title="Indonesia">
//                         <p className='text-justify'>{descriptions.Indonesia}</p>
//                         <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 my-8'>
//                             {countryData?.products?.filter((item:any) => item.country === "Indonesia").map((item:any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
//                                 <div key={item._id} className='mb-4 w-full bg-white flex flex-col shadow-sm'>
//                                     <div className='h-[200px] w-full'>
//                                         <Image
//                                             src={item.img[0]}
//                                             alt={item.title}
//                                             height={1000}
//                                             width={1000}
//                                             className='object-cover w-full h-full'
//                                         />
//                                     </div>
//                                     <div className='px-4 py-4 flex gap-2 items-center justify-between'>
//                                         <h1 className='font-semibold'>{item.title}</h1>
//                                         <div className='bg-primary text-sm rounded-2xl text-white px-4 py-1'>
//                                             <p>{item.size}</p>
//                                         </div>
//                                     </div>
//                                     <div className='flex items-center justify-center cursor-pointer mb-4'>
//                                         <Link href={`/rudraksha/${item?._id}`}>
//                                             <h1 className='font-medium text-primary text-sm underline underline-offset-2'>
//                                                 View Details
//                                             </h1>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Tab>
//                 </Tabs>
//             </div>
//             <div className='flex items-center justify-center w-full my-4 mb-8'>
//                 <Link href={"/rudraksha"}>
//                     <Button className='text-white bg-primary px-12 rounded-sm'>
//                         View all
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default CountryBeads