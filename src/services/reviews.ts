import axios from "axios"
export interface Review {
    userID:string,
    rating:number,
    commentTitle:string,
    comment:string,
}
export const postReview = async (data: Review) => {
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/review/create`,data)
        return res.data
    }catch(error){
        console.log(error)
    }
}

export const getReviewsSlider = async () => {
    try{
        const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE2_URL}/review/get?page=1&limit=9`)
        console.log(res);
        return res.data
    }catch(error){
        console.log(error)
    }
}
export const getReviews = async (limit:number,page:number) => {
    try{
        const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE2_URL}/review/get?page=${page}&limit=${limit}`)
        console.log(res);
        return res.data 
    }catch(error){
        console.log(error)
    }
}
