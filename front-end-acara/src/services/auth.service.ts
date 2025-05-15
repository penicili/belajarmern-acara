import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IActivation, IRegister } from "@/types/Auth";

const authService = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authService;
