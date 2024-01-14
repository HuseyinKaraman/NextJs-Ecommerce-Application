"use client";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/loginSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { signIn } from "next-auth/react";

const inputs = [
    {
        name: "email",
        type: "email",
        placeholder: "Your Email Address",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Your Password",
    },
];

const Login = () => {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values, actions) => {
        try {
            setIsLoading(true);
            const res = await signIn("credentials",{
                email: values.email,
                password: values.password,
                redirect: false,
            })
            console.log(res);
            if (res.status === 200) {
                toast.success("Logined successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                push("/");
            }
        } catch (err) {
            const message = err?.error ? err?.error : "Something went wrong";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        setIsLoading(false);
    };

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit,
        validationSchema: loginSchema,
    });

    return (
        <div className="container py-20 sm:h-[630px]">
            <div className="flex flex-col  mx-auto max-w-[500px] shadow-2xl p-5">
                <Title addClass={"text-[40px] text-center"}>Login</Title>
                <form className="flex flex-col gap-y-4 justify-center items-start  mt-[35px]" onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <Input
                            key={index}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[input.name]}
                            errorMessage={errors[input.name]}
                            touched={touched[input.name]}
                        />
                    ))}
                    <button className="btn-primary-2 mt-2 !rounded-none" type="submit" disabled={isLoading}>
                        {isLoading ? "Please Wait..." : "Login"}
                    </button>
                    <Link href={"/register"} className="underline text-sm cursor-pointer text-gray-600">
                        Do you not have a account?
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
