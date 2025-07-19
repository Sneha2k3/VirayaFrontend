"use client"
import { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import axios from "axios";
export default function esewa_success() {
    const searchParams = useSearchParams();
    const gateway = searchParams.get("gateway");
    useEffect(() => {
        const func = async () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const idStr = [];
            let totalAmount = 0;

            for (let item of cart) {
                idStr.push(item._id);
                totalAmount += item.price;
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/payment/success`, {
                gateway,
                productId: idStr.join(","),
                totalAmount
            }); console.log(res.data);
            localStorage.removeItem("cart");
            window.location.href = "/";
        }

        func();
    }, []);
    return (
        <div>
            E-sewa success;
        </div>
    );
}
