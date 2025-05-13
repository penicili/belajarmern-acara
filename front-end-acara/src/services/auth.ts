import instance from '@/libs/axios/instance';
import endpoint from '@/services/endpoint.constant';
import { IRegister } from '@/types/Auth';

const authService = {
    register: (payload: IRegister)=> instance.post(`${endpoint.AUTH}/register`, payload),
}

export default authService;