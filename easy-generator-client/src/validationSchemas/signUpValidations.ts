import { object, string } from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z ]+$/;

export const signUpSchema = object({
  email: string().email().required(),
  name: string()
    .matches(nameRegex, `Name must only contains alphabets`)
    .required(),
  password: string()
    .matches(
      passwordRegex,
      `Password must contain 1 number, 1 uppercase, 1 special character and must be minimum 8 characters long`
    )
    .required(),
});
