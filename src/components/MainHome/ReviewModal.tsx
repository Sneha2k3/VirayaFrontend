import React, { useState } from 'react';
    import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Input,
    Textarea
    } from "@nextui-org/react";
    import { FaStar } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { postReview, Review } from '@/services/reviews';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { AuthResponse } from '@/types/types';

    interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    }

    const ReviewModal:React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [caption, setCaption] = useState("");
    const [review, setReview] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const {data:SessionData}=useSession()
    const session=SessionData as unknown as AuthResponse
    const id=session?.user?.id

    const {mutate:postReviewMutation} = useMutation({
        mutationFn:(data:Review)=>postReview(data),
        onSuccess:() => {
            toast.success("Review submitted successfully");
            onClose();
            setRating(0)
            setCaption("")
            setReview("")
        },
        onError:()=>{
            toast.error("Failed to submit review");
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rating && caption && review) {
            postReviewMutation({ rating, commentTitle:caption, comment:review, userID:id });
            } else {
                toast.error("Please fill in all fields");
            }
    };

    return (
        <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        classNames={{
            body: "py-6",
            backdrop: "bg-black/50 backdrop-opacity-40",
            base: "border-gray-200",
            header: "border-b-[1px] border-gray-200",
            footer: "border-t-[1px] border-gray-200",
        }}
        >
        <ModalContent>
            <form action="" onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">Share Your Experience</h2>
                <p className="text-sm text-gray-500">Tell us about your experience with our Rudraksha beads</p>
                </ModalHeader>
                <ModalBody>
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="focus:outline-none"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => setRating(star)}
                        >
                            <FaStar
                            className={`w-8 h-8 ${
                                star <= (hoveredStar || rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } transition-colors duration-200`}
                            />
                        </button>
                        ))}
                    </div>
                    </div>

                    <div className="space-y-4">
                    <Input
                        label="Review Title"
                        placeholder="Enter a brief title for your review"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        classNames={{
                        label: "text-sm font-medium",
                        }}
                    />

                    <Textarea
                        label="Your Review"
                        placeholder="Share your thoughts about our product..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        minRows={4}
                        classNames={{
                        label: "text-sm font-medium",
                        }}
                    />
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                </Button>
                <Button 
                    className='bg-primary text-white rounded-sm px-4'
                    isDisabled={!rating || !caption || !review}
                    type='submit'
                >
                    Submit Review
                </Button>
                </ModalFooter>
            </form>
        </ModalContent>
        </Modal>
    );
    };

export default ReviewModal;
