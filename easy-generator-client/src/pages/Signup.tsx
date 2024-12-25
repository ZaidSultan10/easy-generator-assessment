import React, { useState } from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import Title from "../components/Title.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SIGN_UP_API } from "../api/authenticationApis.ts";
import { signUpSchema } from "../validationSchemas/signUpValidations.ts";
import { SignUpTypes } from "../interfaces/signUpTypes.ts";
import { messageColorsProps } from "../interfaces/commonComponentTypes.ts";
import { messageColorsDanger, messageColorsSuccess } from "../utils.ts";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<messageColorsProps | null>(
    null
  );
  const navigate = useNavigate();

  const resetAllStates = () => {
    setEmail("");
    setPassword("");
    setName("");
    setMessageColor(null);
    setMessage("");
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const validatedData: SignUpTypes = await signUpSchema.validate({
        email: email,
        password: password,
        name: name,
      });
      const response = await axios.post(
        SIGN_UP_API,
        {
          email: validatedData?.email,
          password: validatedData?.password,
          name: validatedData?.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      if (response?.data?.statusCode === 201) {
        setMessageColor(messageColorsSuccess());
        setMessage(response?.data?.message);
        setTimeout(() => {
          resetAllStates();
          navigate("/");
        }, 1000);
      } else {
        setMessageColor(messageColorsDanger());
        setMessage(response?.data?.message);
      }
    } catch (Err) {
      console.log(Err);
      setIsLoading(false);
      setMessageColor(messageColorsDanger());
      setMessage(Err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-lvh w-full p-8">
      {message && messageColor && (
        <Title
          text={message}
          titleStyles={`text-[20px] ${messageColor?.text} ${messageColor?.bgColor} ${messageColor?.borderColor} p-1 w-[400px] flex items-center`}
        />
      )}
      <div>
        <Title titleStyles={`text-[40px] mb-8`} text={`Create your profile`} />
      </div>
      <div className="w-[600px] p-3 h-full rounded-md h-[420px] bg-white">
        <div className="w-full m-2 p-2 flex items-center justify-center">
          <Input
            type={"text"}
            placeholder={"Business Email..."}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
            inputStyles={`border-b-2 border-grey-600 outline outline-0 pl-2 w-[400px] text-xl h-[40px]`}
          />
        </div>
        <div className="w-full m-2 p-2 flex items-center justify-center">
          <Input
            type={"text"}
            placeholder={"Name..."}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            inputStyles={`border-b-2 border-grey-600 outline outline-0 pl-2 w-[400px] text-xl h-[40px]`}
          />
        </div>
        <div className="w-full m-2 p-2 flex items-center justify-center">
          <Input
            type={"password"}
            placeholder={"Password..."}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
            inputStyles={`border-b-2 border-grey-600 outline outline-0 pl-2 w-[400px] text-xl h-[40px]`}
          />
        </div>
        <div className="w-full flex mx-2 px-2 items-center justify-center">
          <div className="w-full px-2 mx-2 flex items-center justify-center">
            <Input
              type={"checkbox"}
              placeholder={""}
              handleChange={() => {}}
              value={""}
              inputStyles={``}
            />
            <Title
              titleStyles={`px-2 mx-2`}
              text={`I agree to the terms and conditons`}
            />
          </div>
        </div>
        <div className="w-full m-2 mt-4 p-2 flex items-center justify-center">
          <Button
            isLoading={isLoading}
            title={"Sign Up"}
            buttonStyles={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-[400px] place-items-center`}
            handleClick={() => handleSignup()}
          />
        </div>
        <div className="w-full m-2 p-2 flex items-center justify-center">
          <Title titleStyles={`mr-2`} text={`Already have an account?`} />
          <Link to={"/"}>
            <Button
              title={"Sign In"}
              buttonStyles={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-[200px]`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
