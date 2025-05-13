import { Button, Card, CardBody, divider, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePassword, handleVisiblePassword } = useRegister();
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
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
      <Card className="p-8 m-6">
        <CardBody>
          <h1 className="text-xl font-bold text-danger-500">Create Account</h1>
          <p className="mb-4 text-small">
            Already Have an Account?&nbsp;
            <Link href="/login" className="font-semibold text-danger-400">
              Login here
            </Link>
          </p>
          <form className="flex w-80 flex-col gap-4">
            <Input
              type="text"
              label="Full Name"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="text"
              label="Username"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="email"
              label="Email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type={visiblePassword.password ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
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
            <Input
              type={visiblePassword.confirmPassword ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
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
            <Button color="danger" size="lg" type="submit">
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
