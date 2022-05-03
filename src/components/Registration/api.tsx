import axios from 'axios'


export const instance = axios.create({
  //baseURL: process.env.REACT_APP_BACK_URL ,
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})



export const authAPI = {

  register: (email: string, password: any) => instance.post('auth/register', {email, password})   
  
  //register: (email: number, password: number) => 
      // instance.post<AxiosRequestConfig<number>>('/auth/register', email, password)

  }