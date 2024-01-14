import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required")
    .min(8,"Password must be at least 8 characters")
    .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-+.,])[A-Za-z\d@$!%*?&+.,]/,"Password must contain at least one upper case,lower case,one digit,special characters")
});
