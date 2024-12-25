import React from "react";
import Title from "../components/Title.tsx";

const Welcome = () => {
  return (
    <div className="w-full m-2 p-2 flex items-center justify-center">
      <Title titleStyles={`text-[40px]`} text={`Welcome to the application`} />
    </div>
  );
};

export default Welcome;
