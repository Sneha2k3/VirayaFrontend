"use client"
import SharedTitle from '@/shared/SharedTitle/SharedTitle'
import { generateStars } from '@/utils/generateStars';
import { Avatar, Button } from '@nextui-org/react';
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider, { CustomArrowProps } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewModal from './ReviewModal';
import { useQuery } from '@tanstack/react-query';
import { getReviewsSlider } from '@/services/reviews';
import Loader from '@/shared/Loader';
import Login from '@/shared/Login/Login';
import { useSession } from 'next-auth/react';


interface CustomArrowComponentProps extends CustomArrowProps {
    onClick?: () => void;
}

const CustomPrevArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
    <Button
        isIconOnly
        onClick={onClick}
        className="absolute lg:-left-8 left-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary/50 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
    >
        <FaChevronLeft />
    </Button>
)

const CustomNextArrow: React.FC<CustomArrowComponentProps> = ({ onClick }) => (
    <Button
        isIconOnly
        onClick={onClick}
        className="absolute lg:-right-8 right-0 top-1/2 text-white -translate-y-1/2 z-10 bg-primary/50 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
    >
        <FaChevronRight/>
    </Button>
)

export interface Review{
    _id: number;
    userID:{
        fullName: string;
    }
    rating: number;
    commentTitle: string;
    comment: string;
    createdAt: string;
}

const Reviews = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        centerPadding: '0px',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        autoplay: true,
        cssEase: 'linear',
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

    const {status}=useSession()


    
    const {data:reviewsData,isLoading}=useQuery({
        queryKey: ["reviews-slider"],
        queryFn:()=>getReviewsSlider()
    })
    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleOpenModal = (): void => {
        if(status==="unauthenticated"){
            setIsLoginModalOpen(true)
            return
        }
        setIsModalOpen(true);
    }
    const handleCloseModal = (): void => setIsModalOpen(false)

    if(isLoading)return <Loader/>

    return (
        <div className="w-full">
            <Login isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}/>
            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div className="px-4 md:px-16 mb-12">
                <SharedTitle title="Reviews" />
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center justify-between">
                    <div>
                        <h1 className="font-semibold text-3xl text-primary">Share Your Experience with Us</h1>
                        <p className="text-gray-500 text-sm text-justify my-4">
                            We value your journey with our authentic rudraksha beads and would love to hear about your experience. 
                            Share your review and let your voice guide others in discovering the power of rudraksha.
                        </p>
                    </div>
                    <Button onPress={handleOpenModal} className="px-12 rounded-sm bg-primary text-white hover:bg-primary/90">
                        Leave a review
                    </Button>
                </div>
            </div>

            <div className="w-full bg-gray-100 py-12 overflow-hidden relative lg:px-20 px-4">
                <Slider {...settings}>
                    {reviewsData?.reviews.map((item:Review) => (
                            <div className='px-8 w-full relative min-h-[300px]' key={item?._id}>
                                <div className="bg-white rounded-lg shadow-md h-auto px-10 py-8 hover:shadow-lg transition-shadow duration-300">
                                    <div className='flex gap-4 items-center mb-6'>
                                        <Avatar
                                            color='warning'
                                            as="button"
                                            size="md"
                                            src={`https://ui-avatars.com/api/?name=${item?.userID?.fullName}&background=E4C087&color=ffff`}
                                        />
                                        <div className='font-medium'>
                                            <h1 className='leading-5 '>{item?.userID?.fullName}</h1>
                                            <p className='text-xs text-gray-400'>{item?.createdAt?.split("T")[0]}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-4'>
                                        <div className='flex gap-1 text-primary text-xl'>{generateStars(item.rating)}</div>
                                        <div className='flex flex-col gap-1 mt-4'>
                                            <h1 className='text-lg font-light'>{item.commentTitle}</h1>
                                            <p className='text-sm text-gray-500 text-justify'>{item.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Slider>

            </div>
        </div>
    );
    };

export default Reviews;
