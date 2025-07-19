"use client"
import { getReviews } from '@/services/reviews'
import Loader from '@/shared/Loader'
import SharedTitle from '@/shared/SharedTitle/SharedTitle'
import { Avatar, Button, Pagination } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import ReviewModal from '../MainHome/ReviewModal'
import { useSession } from 'next-auth/react'
import Login from '@/shared/Login/Login'
import { Review } from '../MainHome/Reviews'
import { generateStars } from '@/utils/generateStars'

const items_per_page = 9

const Reviews = () => {

  const [page,setPage]=useState(1)
  const {status}=useSession()
  const {data:reviewsData,isLoading}=useQuery({
        queryKey: ["all-review",items_per_page,page],
        queryFn:()=>getReviews(items_per_page,page)
    })

  
    const pageRef=useRef<HTMLDivElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    

    const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    <div className='w-full lg:px-16 px-4'>
      <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Login isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}/>
      <div className="px-4 md:px-16 mb-12">
                <SharedTitle title="Reviews" />
                <div ref={pageRef} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center justify-between">
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4'>
            {
			reviewsData?.reviews.map((item : Review) => (
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
                        ))
	    }
        </div>
        {
		reviewsData?.totalPages > 1 && 
          <div className='w-full flex items-center justify-center'>
            <Pagination isCompact showControls onChange={handlePageChange} page={page} initialPage={1} total={reviewsData?.totalPages} color='primary' className='gap-2'/>
          </div>
        }

    </div>
  )
}

export default Reviews
