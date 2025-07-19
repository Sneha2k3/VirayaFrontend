"use client"
import { getProductsSlider } from '@/services/products';
import Loader from '@/shared/Loader';
import SharedTitle from '@/shared/SharedTitle/SharedTitle';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface CustomArrowComponentProps extends CustomArrowProps {
    onClick?: () => void;
}

const CustomPrevArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
    <Button
        isIconOnly
        onClick={onClick}
        className="absolute lg:-left-8 left-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
    >
        <FaChevronLeft />
    </Button>
)

const CustomNextArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
    <Button
        isIconOnly
        onClick={onClick}
        className="absolute lg:-right-8 right-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
    >
        <FaChevronRight />
    </Button>
)

const ProductsHome = () => {
    const { data: productsData, isLoading } = useQuery({
        queryKey: ["all-products"],
        queryFn: () => getProductsSlider()
    })

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (isLoading) return <Loader />

    return (
        <div className='w-full relative flex flex-col lg:px-24 px-4 bg-primary/10'>
            <SharedTitle title="Top Selling Products" />
            <p className='text-justify mb-8'>Ceramic art is a timeless expression of culture, creativity, and craftsmanship. Rooted in centuries of tradition, each ceramic piece carries a story—shaped by earth, refined by fire, and crafted by human hands. At Vitraya, our ceramics are more than functional objects; they are vessels of warmth, beauty, and individuality. Whether for daily use or artistic display, every item invites personal connection and mindful living, making each piece a unique extension of self and space.</p>
            <div className='w-full  pb-12'>
                <Slider {...settings}>
                    {productsData?.products?.map((item: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
                        return (
                            <div className='px-4' key={item._id}>
                                <div className=' w-full bg-white flex flex-col shadow-sm'>
                                    <Link href={`/rudraksha/${item._id}`} className='flex w-full items-center justify-center cursor-pointer'>
                                        <div className='h-[200px] w-full'>
                                            <Image src={item?.img?.[0]} alt='rud' height={1000} width={1000} className='object-cover w-full h-full' />
                                        </div>
                                    </Link>
                                    <div className='px-4 py-4 flex items-center gap-2 justify-between'>
                                        <h1 className=' font-semibold'>{item.title}</h1>
                                        <div className='bg-primary text-sm rounded-2xl text-white px-4 py-1'>
                                            <p>{item.size}</p>
                                        </div>
                                    </div>
                                    <Link href={`/rudraksha/${item._id}`} className='flex w-full items-center justify-center cursor-pointer'>
                                        <h1 className='font-medium text-primary text-sm underline underline-offset-2 mb-4'>View Details</h1>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
            <Link href={"/rudraksha"} className='self-center'>
                <Button className='w-fit px-12 mb-8 bg-primary rounded-sm text-white self-center'>Explore More</Button>
            </Link>
        </div>
    )
}

export default ProductsHome
