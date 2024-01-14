import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
    name: Yup.string().min(5, "Your name must be at least 5 characters").required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /(?=.*?[A-Z])(?=.*?[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-+.,])[A-Za-z\d@$!%*?&+.,]/,
            "Password must contain at least one upper case,lower case,one digit,special characters"
        ),
    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
});
 