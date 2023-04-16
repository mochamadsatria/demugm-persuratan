import ErrorDialog from "@/components/ErrorDialog";
import SuccessDialog from "@/components/SuccessDialog";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Compose(props: any) {
  const [sendError, setSendError] = useState<any>(null);

  const [sendSuccess, setSendSuccess] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    fetch("/api/sendmail", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        const status = res.status;

        if (status == 200) {
          setSendSuccess({ message: res.statusText });
          reset();
        } else setSendError({ message: res.statusText });
      })
      .catch((e) => setSendError(e));
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className="flex flex-col gap-3 w-4/5 lg:w-1/2 px-5 py-10">
          <Link href={"/"}>
            <button
              type="button"
              className="hover:text-blue-700 font-semibold py-2 rounded mt-3 flex justify-left items-center gap-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go Back</span>
            </button>
          </Link>
          <div className="flex justify-between items-center flex-wrap py-4 rounded px-3 outline outline-1 outline-blue-400 mb-5 bg-blue-100">
            <h2 className="text-lg font-bold text-blue-700">{props.name}</h2>
            <h2 className="text-sm">Tag: {props.tag}</h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              To Email
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="outline outline-1 outline-blue-500 hover:bg-blue-50 rounded py-2 px-3 "
              type="text"
              placeholder="Email"
              {...register("mailto", { required: true })}
            />
            {errors["mailto"] && (
              <span className="text-xs text-red-500 italic">
                This field is required
              </span>
            )}
          </div>

          {props.params.map((param: string) => (
            <div key={param} className="flex flex-col gap-2">
              <label className="font-semibold">
                {capitalizeFirstLetter(param)}{" "}
                <span className="text-red-500 italic">*</span>
              </label>
              <input
                className="outline outline-1 outline-blue-500 hover:bg-blue-50 rounded py-2 px-3 "
                type="text"
                placeholder={capitalizeFirstLetter(param)}
                {...register(param, { required: true })}
              />
              {errors[param] && (
                <span className="text-xs text-red-500 italic">
                  This field is required
                </span>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="text-center bg-blue-500 hover:bg-blue-600 outline outline-1 outline-blue-600 text-white font-semibold py-2 rounded mt-3"
          >
            Send Email
          </button>
        </div>
      </form>
      {sendError && (
        <ErrorDialog isOpen={sendError ? true : false} setIsOpen={setSendError}>
          {sendError.message}
        </ErrorDialog>
      )}

      {sendSuccess && (
        <SuccessDialog
          isOpen={sendSuccess ? true : false}
          setIsOpen={setSendSuccess}
        >
          {sendSuccess.message}
        </SuccessDialog>
      )}
    </main>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authorized = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/check"
  ).then((res) => res.status);

  if (authorized != 200) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const data = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/template?templateId=" +
        context.query.templateId
    ).then((res) => res.json());

    return {
      props: data,
    };
  }

  //   const data = await fetch(
  //     process.env.NEXT_PUBLIC_BASE_URL +
  //       "/api/template?templateId=" +
  //       context.query.templateId
  //   ).then((res) => res.json());

  //   return {
  //     props: data,
  //   };
};
