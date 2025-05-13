import environment from "@/config/environment";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface CustomSession extends Session {
  accesToken?: string;
}

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: CustomSession | null = await getSession();
    if (session && session.accesToken) {
      request.headers.Authorization = `Bearer ${session.accesToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
