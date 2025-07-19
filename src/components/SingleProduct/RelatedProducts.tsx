import { getExclude } from '@/services/products'
import Loader from '@/shared/Loader'
import { Chip } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Product } from '../Pot/pot'

interface props {
    id: string | undefined | string[]
}
const RelatedProducts: React.FC<props> = ({ id }) => {

    const { data: relatedProducts, isLoading } = useQuery({
        queryKey: ["related-products", id],
        queryFn: () => getExclude(id),
        enabled: !!id
    })

    if (isLoading) return <Loader />

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
            {relatedProducts?.products.map((item: Product) => (
                <div key={item._id} className='w-full rounded-lg bg-white shadow-md relative'>
                    <div className='absolute top-4 right-4 bg-primary text-white px-2 py-1 text-xs rounded-full'>
                        <p>Special</p>
                    </div>
                    <div className='w-full h-[200px]'>
                        <Image src={item.img[0]} alt={item.title} width={1000} height={1000} className='w-full h-full object-cover rounded-md' />
                    </div>
                    <div className="flex items-center justify-center flex-col gap-4 my-4 px-4">
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <div className="flex gap-2">
                            <Chip size="sm" variant="flat" className='text-white bg-primary'>{item.size}</Chip>
                            <Chip size="sm" variant="flat" className='text-white bg-purple-300'>{item.faces} Face</Chip>
                        </div>
                        <div className="text-2xl font-bold text-primary">${item.price}</div>
                        <Link href={`/pot/${item._id}`} className='w-full'>
                            <p className='text-primary hover:text-primary/80 font-medium text-center underline underline-offset-2 hover:underline-offset-4 duration-300 text-xs'>View Details</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RelatedProducts
