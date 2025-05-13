import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";

const Register = () => {
  // destructure properties dari useRegister
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    errors,
    handleRegister,
    handleSubmit,
    isPendingRegister,
  } = useRegister();
  console.log(errors);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="Logo Acara"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          className="w-2/3 lg:w-full"
          alt="Logo Acara"
          width={1024}
          height={1024}
        />
      </div>
      <Card className="m-6 p-8">
        <CardBody>
          <h1 className="text-xl font-bold text-danger-500">Create Account</h1>
          <p className="mb-4 text-small">
            Already Have an Account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-400">
              Login here
            </Link>
          </p>
          <form
            className="flex w-80 flex-col gap-4"
            // handleSubmit dari react-hook-form bakal ngelakuin its thing (validasi dll)
            // dan kalo berhasil, bakal manggil handleRegister (eksekusi register service)
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Full Name"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Button color="danger" size="lg" type="submit">
              {isPendingRegister ? <Spinner color="white" size="md"/> : ("Register")}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
