import ErrorDialog from "@/components/ErrorDialog";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [authError, setAuthError] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        const status = res.status;

        if (status == 200) router.replace("/");
        else setAuthError({ message: res.statusText });
      })
      .catch((e) => setAuthError(e));
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className="flex flex-col gap-3 w-4/5 lg:w-1/3 px-5 py-10">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Username <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="outline outline-1 outline-blue-500 hover:bg-blue-50 rounded py-2 px-3 "
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-xs text-red-500 italic">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Password <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="outline outline-1 outline-blue-500 hover:bg-blue-50 rounded py-2 px-3 "
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-500 italic">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="text-center bg-blue-500 hover:bg-blue-600 outline outline-1 outline-blue-600 text-white font-semibold py-2 rounded mt-3"
          >
            Login
          </button>
        </div>
      </form>

      {authError && (
        <ErrorDialog isOpen={authError ? true : false} setIsOpen={setAuthError}>
          {authError.message}
        </ErrorDialog>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authorized = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/check"
  ).then((res) => res.status);

  if (authorized == 200) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else
    return {
      props: {},
    };
};
