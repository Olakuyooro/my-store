import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("username")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className=" bg-gray-50 flex justify-center h-screen py-12">
      <form
        className="bg-white shadow-2xl flex flex-col w-[30%] items-center p-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col w-[70%] space-y-1 mt-32 ">
          <label className="text-sm font-bold">Username</label>{" "}
          <input className="p-1 rounded-md bg-gray-100" {...register("username", {required:true})} />
          {errors.username && <span className="text-xs text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col w-[70%] space-y-1">
          <label className="text-sm font-bold">Password</label>
          <input
            className="p-1 rounded-md bg-gray-100"
            type="password"
            {...register("password", { required: true })}
          />
            {errors.password && <span className="text-xs text-red-500">This field is required</span>}

        </div>     
        <input
          className="bg-black w-[70%] text-white p-2 text-sm text-center rounded-md"
          type="submit"
        />
      </form>
    </div>
  );
}
