// "use client"
// import { getByFilter } from "@/services/products"
// import { josefin } from "@/utils/font"
// import { Chip, Link } from "@nextui-org/react"
// import { useQuery } from "@tanstack/react-query"
// import Image from "next/image"
// import { FiArrowRight } from "react-icons/fi"
// import { Product } from "../Bracelet/Bracelet"
// import Loader from "@/shared/Loader"
// import SharedTitle from "@/shared/SharedTitle/SharedTitle"


// const Exclusive = () => {

//   const {data:exclusiveProducts,isLoading} = useQuery({
//     queryKey: ['exclusiveProducts'],
//     queryFn: () => getByFilter('exclusive','true')
//   })

//   if(isLoading)return<Loader/>

//   return (
//     <div className='w-full'>
//       <div className="relative h-[500px] text-white">
//               <Image
//                 src="https://images.pexels.com/photos/9313444/pexels-photo-9313444.jpeg?auto=compress&cs=tinysrgb&w=800"
//                 alt="Rudraksha Background"
//                 fill
//                 className="object-cover object-center"
//                 priority
//               />
//               <div className="absolute inset-0 bg-black/60" />
//               <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
//                 <div className="max-w-3xl">
//                   <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${josefin.className}`}>
//                     Our Exclusive Collection
//                   </h1>
//                   <p className="text-lg md:text-xl text-gray-100 mb-8">
//                     Explore our curated collection of exclusive products, carefully sourced from sacred locations across Nepal and Indonesia.
//                   </p>
//                 </div>
//               </div>
//         </div>
//           <div className="mx-auto text-center mb-12">
//               <SharedTitle title="Our Exclusive Collection" />
//               <p className="text-gray-600 w-4/5 mx-auto mt-4">
//                 Discover our carefully curated selection of premium Rudraksha products, 
//                 handpicked for their exceptional quality and spiritual significance. 
//                 Each piece in this collection represents the finest examples of sacred craftsmanship.
//               </p>
//             </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-32">
//             {exclusiveProducts?.products?.map((product:Product) => (
//               <div 
//                   key={product._id} 
//                   className="bg-white rounded-md shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
//                 >
//                       <div className="relative h-56 w-full overflow-hidden">
//                             <Image
//                               src={product.img[0]}
//                               alt={product.title}
//                               height={1000}
//                               width={1000}
//                               className="object-cover hover:scale-110 h-full w-full transition-transform duration-700"
//                             />
//                       </div>
                  
//                   <div className="p-6 text-center">
//                     <h4 className="text-xl font-semibold mb-4">{product.title}</h4>
//                     <div className="flex justify-center gap-2 mb-4">
//                       <Chip size="sm" variant="flat" color="primary">{product.size}</Chip>
//                       <Chip size="sm" variant="flat" color="secondary">{product.faces} Face</Chip>
//                     </div>
//                     <div className="text-2xl font-bold text-primary mb-4">
//                       ${product.price}
//                     </div>
//                     <Link
//                       href={`/rudraksha/${product._id}`}
//                       className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
//                     >
//                       View Details
//                       <FiArrowRight className="ml-2" />
//                     </Link>
//                   </div>
//                 </div> 
              
//             ) )}
//           </div>
//     </div>
//   )
// }

// export default Exclusive
