import React, { useState } from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import Title from "../components/Title.tsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { SIGN_IN_API } from "../api/authenticationApis.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.tsx";
import { signInSchema } from "../validationSchemas/signInValidations.ts";
import { SignInTypes } from "../interfaces/signInTypes.ts";
import { messageColorsProps } from "../interfaces/commonComponentTypes.ts";
import { messageColorsDanger } from "../utils.ts";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<messageColorsProps | null>(
    null
  );
  const { login } = useAuth();
  const navigate = useNavigate();

  const resetAllStates = () => {
    setEmail("");
    setPassword("");
    setMessageColor(null);
    setMessage("");
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const validatedData: SignInTypes = await signInSchema.validate({
        email: email,
        password: password,
      });
      const response = await axios.post(
        SIGN_IN_API,
        {
          email: validatedData?.email,
          password: validatedData?.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      if (response?.data?.statusCode === 200) {
        resetAllStates();
        login(response.data.accessToken);
        navigate("/home");
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
        <Title
          titleStyles={`text-[40px] mb-8`}
          text={`Login to your profile`}
        />
      </div>
      <div className="w-[600px] p-3 h-full rounded-md">
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
          <div className="w-full pl-2 mx-1 flex items-center justify-center">
            <Input
              type={"checkbox"}
              placeholder={""}
              handleChange={() => {}}
              value={""}
              inputStyles={``}
            />
            <Title titleStyles={`ml-2`} text={`Remember me?`} />
          </div>
          <div className="w-full mx-1 px-1 flex items-center justify-center">
            <Title titleStyles={``} text={`Forgot password?`} />
          </div>
        </div>
        <div className="w-full m-2 mt-4 p-2 flex items-center justify-center">
          <Button
            isLoading={isLoading}
            title={"Sign In"}
            buttonStyles={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-[400px] place-items-center`}
            handleClick={() => handleLogin()}
          />
        </div>
        <div className="w-full m-2 p-2 flex items-center justify-center">
          <Title titleStyles={`mr-2`} text={`Dont have an account?`} />
          <Link to={"/signup"}>
            <Button
              title={"Create new account"}
              buttonStyles={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-[200px]`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
