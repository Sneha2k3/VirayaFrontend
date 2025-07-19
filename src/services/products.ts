import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
const BASE2 = process.env.NEXT_PUBLIC_BASE2_URL;

// ---------------------- Specific Product Category APIs ----------------------

export const getAllPots = async (page: number, limit: number, opt: any ={}) => {
    try {
        let url = `${BASE2}/pots?page=${page}&limit=${limit}`;
        for (const key in opt) {
            url += `&${key}=${opt[key]}`;
        }
        console.log(url);
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching pots:", error);
    }
};

export const getAllPlates = async (page: number, limit: number, opt: any ={}) => {
    try {
        let url = `${BASE2}/plates?page=${page}&limit=${limit}`;
        if("size" in opt) {
            url +=`&size=${opt["size"]}`;
        }
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching plates:", error);
    }
};

export const getAllMugs = async (page: number, limit: number, opt: any ={}) => {
    try {
        let url = `${BASE2}/mugs?page=${page}&limit=${limit}`;
        if("size" in opt) {
            url +=`&size=${opt["size"]}`;
        }
        console.log(url);
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching mugs:", error);
    }
};

// ---------------------- General Product APIs ----------------------

export const getProductsSlider = async () => {
    try {
        const res = await axios.get(`${BASE2}/get/products?page=1&limit=8`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSingleProduct = async (id: string) => {
    try {
        const res = await axios.get(`${BASE2}/get/product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSpecialProduct = async () => {
    try {
        const res = await axios.get(`${BASE}/get/products?filterBy=special&filterValue=true`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllProducts = async (page: number, limit: number) => {
    try {
        const res = await axios.get(`${BASE2}/get/products?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByCategory = async (category: string, page: number, limit: number) => {
    try {
        const res = await axios.get(`${BASE}/get/products/?filterBy=category&filterValue=${category}&page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByCountry = async (country: string) => {
    try {
        const res = await axios.get(`${BASE2}/get/products/?filterBy=country&filterValue=${country}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByFilter = async (category: string, value: string) => {
    try {
        const res = await axios.get(`${BASE}/get/products/?filterBy=${category}&filterValue=${value}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getExclude = async (id: string | undefined | string[]) => {
    try {
        const res = await axios.get(`${BASE}/get/products/?excludeId=${id}&page=1&limit=4`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByMultipleFilters = async (
    filters: Record<string, string>,
    page?: number,
    limit?: number
) => {
    try {
        const filterKeys = Object.keys(filters).filter(key => filters[key]);
        const filterValues = filterKeys.map(key => filters[key]);

        let url = `${BASE}/get/products/?filterBy=${filterKeys.join(',')}&filterValue=${filterValues.join(',')}`;

        if (page && limit) {
            url += `&page=${page}&limit=${limit}`;
        }

        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSubCategories = async () => {
    try {
        const res = await axios.get(`${BASE}/category/get`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
