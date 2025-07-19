import axios from "axios"

export const userSearch=async (q:string|null)=>{
    try{
        const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE2_URL}/product/search?title=${q}&description=joined`)
        return res
    }catch(err){
        console.log(err)
    }
}