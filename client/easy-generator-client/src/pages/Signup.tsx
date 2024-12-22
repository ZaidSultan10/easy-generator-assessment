import React, { useState } from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import Title from "../components/Title.tsx";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log(
      "email: ",
      email,
      "-----",
      "password:",
      password,
      "----",
      "name:",
      name
    );
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-lvh w-full p-8">
      <div>
        <Title titleStyles={`text-[40px] mb-8`} text={`Create your profile`} />
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
            title={"Sign Up"}
            buttonStyles={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-[400px]`}
            handleClick={() => handleSignup()}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
