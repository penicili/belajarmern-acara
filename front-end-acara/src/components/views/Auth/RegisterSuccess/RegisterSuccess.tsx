import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter();
  return (
    <div className="flex w-screen flex-col">
      <div className="itesm-center flex flex-col items-center justify-center gap-10 p-4">
        <Image
          src="/images/general/logo.svg"
          alt="Logo Acara"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-danger-500">
            Registration Success
        </h1>
        <p className="text-xl font-bold text-default-500">
            Check your email to verify your account and get started with Acara.
        </p>
        <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={() => router.push("/")}>
            Back to Home
        </Button>
      </div>
    </div>
  );
};
export default RegisterSuccess;
