import axios from "axios"
import { IPost, ISettings, IUser } from "../types";

export const getSettings = async () => {
    const response = await axios.get<ISettings>('http://localhost:4000/settings')
    return response.data;
}


export const getPosts = async () => {
    const response = await axios.get<IPost[]>('http://localhost:4000/posts')
    return response.data;
}

export const getUsers = async () => {
    const response = await axios.get<IUser[]>('http://localhost:4000/users')
    return response.data;
}