// "use client"
// import SharedTitle from '@/shared/SharedTitle/SharedTitle'
// import { Button } from '@nextui-org/react';
// import React from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { CustomArrowProps } from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';
// import Image from 'next/image';
// import { josefin } from '@/utils/font';

// interface CustomArrowComponentProps extends CustomArrowProps {
//     onClick?: () => void;
// }

// const CustomPrevArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
//     <Button
//         isIconOnly
//         onClick={onClick}
//         className="absolute lg:-left-8 left-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
//     >
//         <FaChevronLeft />
//     </Button>
// )

// const CustomNextArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
//     <Button
//         isIconOnly
//         onClick={onClick}
//         className="absolute lg:-right-8 right-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
//     >
//         <FaChevronRight/>
//     </Button>
// )

// const WhyUs = () => {
//     const rudrakshaBenefits = [
//     {
//         title: "Wealth and Abundance",
//         image:"https://images.unsplash.com/photo-1705575480602-8bbd28173fdc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         description: "Rudraksha beads, especially those with multiple mukhis, are believed to attract wealth and prosperity. They are known to enhance the flow of positive energy, opening doors to financial success and abundance. Wearing a rudraksha mala or keeping it close can improve financial stability, making it an excellent tool for those seeking to increase their wealth and material success.",
//     },
//     {
//         title: "Well-being and Health",
//         image:"https://st4.depositphotos.com/21878056/39621/i/450/depositphotos_396215234-stock-photo-rudraksha-beads-bracelet-female-prayer.jpg",
//         description: "Rudraksha beads are revered for their holistic healing properties. They are said to promote physical well-being by balancing the body’s energy. The natural vibrations emitted by the beads are thought to stimulate positive changes in the wearer’s health, providing relief from stress, anxiety, and even chronic conditions. They are also known to regulate blood pressure, improve circulation, and enhance overall vitality."
//     },
//     {
//         title: "Relationships and Harmony",
//         image:"https://st3.depositphotos.com/9485312/18877/i/450/depositphotos_188776960-stock-photo-hand-prayer-holding-rudraksha-beads.jpg",
//         description: "Rudraksha beads are believed to have a powerful effect on relationships, bringing harmony, love, and understanding between individuals. Whether in romantic partnerships, family, or friendships, rudraksha helps balance emotional energies, fostering compassion and open communication. It can also help resolve conflicts and prevent misunderstandings, promoting peaceful and loving relationships."
//     },
//     {
//         title: "Protection and Spiritual Growth",
//         image:"https://st3.depositphotos.com/26776340/36179/i/600/depositphotos_361792054-stock-photo-youga-woman-in-the-class.jpg",
//         description: "Rudraksha is often worn for spiritual protection, as it is believed to shield the wearer from negative energies and psychic attacks. It is said to create an energetic shield that protects against harmful influences, while promoting spiritual growth and enlightenment. Wearing rudraksha beads can strengthen one's connection to the divine, enhance meditation, and deepen one’s spiritual practices, leading to inner peace and spiritual awakening."
//     }
// ];

//     const settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow:  2,
//         slidesToScroll: 1,
//         prevArrow: <CustomPrevArrow />,
//         nextArrow: <CustomNextArrow />,
//         autoplay:true,
//         pauseOnHover: true,
//         autoplaySpeed:4000,
//         responsive: [
//             {
//                 breakpoint: 1280,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };
//     return (
//         <div className='w-full lg:px-16 px-4'>
//             <SharedTitle title='Rudraksha Benefits'/>
//             <div className='w-full  pb-12'>
//                 <Slider {...settings}>
//                     {rudrakshaBenefits.map((item,index)=>{
//                         return(
//                         <div className='px-4' key={index}>
//                             <section  className='flex h-[400px] w-full items-center justify-center relative'>
//                                 <div className='absolute left-0 w-4/5 h-[400px]'>
//                                     <Image src={item.image} alt={item.title} height={1000} width={1000} className='object-cover h-full w-full shadow-md rounded-sm group'/>
//                                 </div>
//                                 <div className='absolute w-3/5 z-[1000] right-0 flex flex-col gap-4 shadow-md'>
//                                     <div className='bg-white rounded-sm shadow-md px-4'>
//                                         <div className='flex gap-5 w-full my-4 px-4'>
//                                             <div className='h-auto bg-primary w-[4px] rounded-md'></div>
//                                             <h1 className={`${josefin.className} font-semibold lg:text-xl text-base`}>{item.title}</h1>
//                                         </div>
//                                     </div>
//                                     <div className='relative px-6 py-4 bg-white'>
//                                         <p className='text-justify text-xs'>{item.description}</p>
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>
//                         )
//                     })}
//                 </Slider>
//             </div>
//         </div>
//     )
// }

// export default WhyUs
