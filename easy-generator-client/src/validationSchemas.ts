import { object, string } from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signInSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export const signUpSchema = object({
  email: string().email().required(),
  name: string().required(),
  password: string()
    .matches(
      passwordRegex,
      `Password must contain 1 number, 1 uppercase, 1 special character and must be minimum 8 characters long`
    )
    .required(),
});
