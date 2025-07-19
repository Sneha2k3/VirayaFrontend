import axios from "axios";

export const registerUser = async (data: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/register`, data);
  return response;
};

export const changePassword = async (id:string,data: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/changePassword/${id}`, data);
  return response;
}

export const updateProfile = async (id:string,data: any) => { //eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/updateUser/${id}`, data);
  return response;
}