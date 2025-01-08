import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export type AdminSettings = {
    about: number,
    address: number,
    birthday: number
}

export type User = {
    id: number | null, 
    email: string, 
    password: string, 
    birthday: Date | null,
    about: string, 
    address: string, 
    city: string, 
    state: string,
    zipcode: number | null, 
}

export type Users = {
    users: User[]
}

export type Message = {
    message: string
}

export const defaultSettings: AdminSettings = {
    about: 1,
    address: 1, 
    birthday: 1
}

export const defaultUser: User = {
    id: null, 
    email: '', 
    password: '', 
    birthday: null,
    about: '', 
    address: '', 
    city: '', 
    state: '',
    zipcode: null, 
}

export const fetchAllUsers = async () => {
    const response = await axios.get<Users>('/api/user')
    return response
}

export const fetchOrCreateUser = async (user: User) => {
    try {
        let response = await axios.get<User>('/api/user', {
            params: {
                email: user.email
            }
        })
        return response
    } catch (error: any) {
        if (error?.response?.status === 404) {
            let response = await axios.post<User>('/api/user', {
                email: user.email, 
                password: user.password
            })
            return response
        }
        throw error;
    }
}

export const updateUser = async (user: User) => {
    const response = await axios.put<User>(`/api/user/${user.id}`, user);
    return response
}

export const fetchAdminSettings = async () => {
    const response = await axios.get<AdminSettings>('/api/admin');
    return response
}

export const updateAdminSettings = async (setting: AdminSettings) => {
    const response = await axios.put<AdminSettings>('/api/admin', setting);
    return response;
}