"use client";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { registerSchema } from "@/schema/registerSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

const inputs = [
    {
        name: "name",
        type: "text",
        placeholder: "Your Name",
    },
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
    {
        name: "confirmPassword",
        type: "password",
        placeholder: "Your Password Again",
    },
];

const Register = () => {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values, actions) => {
        try {
            setIsLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
            if (res.status === 201) {
                toast.success("Registered successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                push("/login");
            }
        } catch (err) {
            const message = err?.response?.data ? err?.response?.data.error : "Something went wrong";
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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        onSubmit,
        validationSchema: registerSchema,
    });

    return (
        <div className="container m-auto py-20 sm:h-screen">
            <div className="flex flex-col  mx-auto max-w-[400px] sm:max-w-[500px] shadow-2xl p-5">
                <Title addClass={"text-[40px] text-center"}>Register</Title>
                <form className="flex flex-col gap-y-3 justify-center items-start mb-4 mt-[35px]" onSubmit={handleSubmit}>
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
                    <button className="btn-primary-2 !rounded-none mt-2" type="submit" disabled={isLoading}>
                        {isLoading ? "Please Wait..." : "Submit"}
                    </button>
                    <Link href={"/login"} className="underline text-sm cursor-pointer text-gray-600">
                        Do you have a account?
                    </Link>
                </form>
                <div className="flex gap-4 w-full !text-[16px]">
                    <button
                        className="btn-secondary w-full !rounded-none !text-white"
                        type="button"
                        onClick={() => signIn("github")}
                    >
                        <i className="fa-brands fa-github mr-2"></i>GITHUB
                    </button>
                    <button
                        className="btn-primary-2 !bg-red-600 !rounded-none w-full !text-white"
                        type="button"
                        onClick={() => signIn("google",{callbackUrl:"http://localhost:3000"})}
                    >
                        <i className="fa-brands fa-google mr-2"></i>SIGN IN WITH GOOGLE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
