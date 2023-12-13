import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../redux/FormData/FormDataSlice";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

type RootState = {
  formData: FormData;
};

const schema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error:
        "Username must be a string with a minimum length of 3 and a maximum length of 20",
    })
    .min(3, { message: "atleast 3 characters" })
    .max(20, { message: "Should not exceed more than 20 characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email Id",
    })
    .email(),
  phoneNumber: z
    .string({
      required_error: "phone number is required",
      invalid_type_error: "10 digits only",
    })
    .min(10, { message: "10 digits only" }),
});

export const Form: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.formData);

  console.log({ formData });

  const data: FormData = { name: "", email: "", phoneNumber: "" };
  const [inputData, setInputData] = useState<FormData>(data);

  const [flag, setFlag] = useState(false);

   const handleData = (e: any) => {
      setFlag(true);
      dispatch(updateField(e));
   };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (flag === true) {
    return (
      <>
        <div className="flex flex-col justify-center items-center mt-32 bg-gray-50 rounded-md shadow-xl  w-96 h-96">
          <div className=" flex p-4 font-bold justify-center">
            <h2>Enter verification code</h2>
          </div>
          <div className="flex flex-row  justify-center space-x-2 ">
            <input
              type="text"
              placeholder="___"
              className="p-2 my-24 border w-10 h-10 rounded-md"
            />
            <input
              type="text"
              placeholder="___"
              className="p-2 my-24 border w-10 h-10 rounded-md"
            />
            <input
              type="text"
              placeholder="___"
              className="p-2 my-24 border w-10 h-10 rounded-md"
            />
            <input
              type="text"
              placeholder="___"
              className="p-2 my-24  border w-10 h-10 rounded-md"
            />
          </div>
          <div className="flex justify-center text-white text-[14px]">
            <button
              className="hover:bg-red-300 p-0.5 px-8  bg-red-400 rounded-md hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex flex-wrap items-center md:gap-0.5">
        <div className="flex flex-wrap justify-center mx-auto bg-white shadow-xl h-[370px] w-[370px] md:min-h-[554.2px] md:min-w-[500px] ">
          <form
            onSubmit={handleData
            //   handleSubmit((e: any) => {
            //    setFlag(true);
            //   dispatch(updateField(e));
             
            //   //dispatch(resetForm());
            // })
          }
          >
            <div className="text-center font-bold my-2 text-black decoration-from-font pt-8 text-2xl">
              <h1>Welcome Back!</h1>
            </div>
            <h2 className="text-center mx-1 text-gray-500 text-xs">
              Sign in to your account
            </h2>

            <div className="flex flex-col justify-center m-auto md:min-px-[28px] pt-8 md:pt-24">
              <div className=" flex flex-col mb-4 text-[10px] text-gray-400 font-semibold">
                <label>Name</label>
                <input
                  type="text"
                  placeholder=""
                  {...register("name")}
                  className="p-1 border md:min-w-[72px] rounded-md border-gray-200"
                />

                {errors.name?.message && (
                  <p className="text-red-500">{errors.name?.message}</p>
                )}
              </div>
              <div className="flex flex-col mb-4 text-[10px] text-gray-400 font-semibold ">
                <label>Email</label>
                <input
                  type="text"
                  placeholder=""
                  {...register("email")}
                  className="p-1 border rounded-md border-gray-200 md:min-w-[72px]"
                />

                {errors.email?.message && (
                  <p className="text-red-500">{errors.email?.message}</p>
                )}
              </div>
              {/* <div className="flex flex-col mb-4 text-[10px] text-gray-400 font-semibold">
                <label>Phone number</label>
                <input
                  type="text"
                  placeholder=""
                  {...register("phoneNumber")}
                  className="p-1 border w-72 rounded-md border-gray-120"
                />

                {errors.phoneNumber?.message && (
                  <p className="text-red-500">{errors.phoneNumber?.message}</p>
                )}
              </div> */}
              <div className="flex items-center mb-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-2 h-2 text-blue-400 bg-gray-100 border-gray-100 rounded focus:ring-blue-300 dark:focus:ring-blue-400 dark:ring-offset-gray-300 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2  text-gray-400 text-[8px] dark:text-gray-300 from-neutral-400"
                >
                  Remember me
                </label>
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-red-400 text-[8px] dark:text-red-300 from-neutral-red pl-40"
                >
                  Change Email
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="hover:bg-red-300 p-1 px-24  bg-red-400 rounded-md hover:text-white  text-white text-[10px]"
                type="submit"
              >
                Next
              </button>
            </div>
            <div className="flex flex-row justify-center pt-12 md:pt-16 ">
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-400 text-[8px] dark:text-gray-300 from-neutral-400"
              >
                Don't have account yet?
              </label>
              <label
                htmlFor="default-checkbox"
                className=" text-sm font-medium text-red-400 text-[8px] dark:text-red-300 from-neutral-red ml-0.5 "
              >
                Signup here
              </label>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap justify-center mx-auto  bg-white shadow-xl h-[370px] w-[370px] md:min-h-[554.2px] md:min-w-[500px] ">
          <img
            className="rounded-full h-36 m-auto"
            src="https://images.pexels.com/photos/4533747/pexels-photo-4533747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </div>
    );
  }
};
 