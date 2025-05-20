import axios  from "axios";
import Cookies from "js-cookie";

export const token = Cookies.get("access_token")

export const instanceAxiosAdmin = axios.create({
    baseURL: process.env.BASE_URL,
})

