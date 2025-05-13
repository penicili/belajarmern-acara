import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

// input validation schema buat register
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Please enter your full name"),
  username: Yup.string().required("Please enter you username"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Minium 6 characters")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Please enter your password"),
});

// buat custom hook buat register
const useRegister = () => {
  // inisiasi useRouter
  const router = useRouter();
  // state untuk password visibility
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  // function untuk toggle password visibility
  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  // function untuk handle submit form
  // destructure data dari useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    // validasi useForm dengan resolver Yup
    resolver: yupResolver(RegisterSchema),
  });

  // panggil function untuk register
  const registerService = async (payload: IRegister) => {
    const result = await authService.register(payload);
    return result;
  };

  // dari function registerService, kita masukin return nya ke useMutation
  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    // set mutation function ke registerService
    mutationFn: registerService,
    // kalalu error, set error ke form dan return error message
    onError(error) {
      console.error("Registration error:", error);
      const errorMessage = (error as any).response?.data?.message || error.message;
      setError("root", {
        message: errorMessage,
      });
    },
    onSuccess() {
      // push router / redirect ke login
      router.push("/auth/register/success");
      reset();
    },
  });
  // handler untuk submit form yang bakal manggil mutateRegister ketika onSubmit
  const handleRegister = (data: IRegister) => mutateRegister(data);

  
  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors
  };
};

export default useRegister;
