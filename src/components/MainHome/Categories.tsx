import SharedTitle from '@/shared/SharedTitle/SharedTitle'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

const Categories = () => {
    return (
        <div className='w-full lg:px-32 px-4 pb-12'>
            <SharedTitle title='Categories' />
            <div className='flex lg:flex-row flex-col w-full gap-4 lg:h-[600px] h-[400px]'>
                <div className='lg:w-1/3 w-full h-full relative group overflow-hidden cursor-pointer'>
                    <Image
                        src={'/pot.jpg'}
                        alt='categories'
                        height={1000}
                        width={1000}
                        className='object-cover h-full w-full group-hover:scale-110 transition-all duration-300 ease-in-out'
                    />
                    <div className='absolute bg-black/20 lg:pb-32 pb-0 flex items-center justify-center inset-0 tracking-widest text-white z-[100]'>
                        <p className='text-4xl font-semibold'>Pot</p>
                    </div>
                    <div className='absolute inset-0 bg-black/40 opacity-0 z-[101] group-hover:opacity-100 flex items-center justify-center transition-all duration-300 ease-in-out'>
                        <Link href={'/pot'}>
                            <Button className='bg-primary rounded-sm px-12 py-0 text-white'>View Details</Button>
                        </Link>
                    </div>
                </div>
                <div className='lg:w-1/3 w-full h-full relative group overflow-hidden cursor-pointer'>
                    <Image
                        src={'/plate.jpg'}
                        alt='categories'
                        height={1000}
                        width={1000}
                        className='object-cover h-full w-full group-hover:scale-110 transition-all duration-300 ease-in-out'
                    />
                    <div className='absolute bg-black/20 lg:pb-32 pb-0 flex items-center justify-center inset-0 tracking-widest text-white z-[100]'>
                        <p className='text-4xl font-semibold'>Plate</p>
                    </div>
                    <div className='absolute inset-0 bg-black/40 opacity-0 z-[101] group-hover:opacity-100 flex items-center justify-center transition-all duration-300 ease-in-out'>
                        <Link href={'/mala'}>
                            <Button className='bg-primary rounded-sm px-12 py-0 text-white'>View Details</Button>
                        </Link>
                    </div>
                </div>
                <div className='lg:w-1/3 w-full h-full relative group overflow-hidden cursor-pointer'>
                    <Image
                        src={'/mug.jpg'}
                        alt='categories'
                        height={1000}
                        width={1000}
                        className='object-cover h-full w-full group-hover:scale-110 transition-all duration-300 ease-in-out'
                    />
                    <div className='absolute bg-black/20 lg:pb-32 pb-0 flex items-center justify-center inset-0 tracking-widest text-white z-[100]'>
                        <p className='text-4xl font-semibold'>Mug</p>
                    </div>
                    <div className='absolute inset-0 bg-black/40 opacity-0 z-[101] group-hover:opacity-100 flex items-center justify-center transition-all duration-300 ease-in-out'>
                        <Link href={'/mug'}>
                            <Button className='bg-primary rounded-sm px-12 py-0 text-white'>View Details</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories