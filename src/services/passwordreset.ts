import axios from "axios"

export const sendOTP=async(email:string)=>{
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/otpSend`,{email})
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const verifyEmail = async (email: string, otp: string) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("otp", otp);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/verifyEmail`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const resetPassword = async (email: string, otp: string, password: string) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("otp", otp);
        formData.append("password", password);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/resetPassword`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};
