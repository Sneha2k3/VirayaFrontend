import axios from "axios"

export interface consult{
    email:string
    phone:string
    message:string
    fullName:string
    date:string
}

export const postConsult=async (data:consult)=>{
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/consultation/create`,data)
        return res
    }catch(err){
        console.log(err)
    }
}