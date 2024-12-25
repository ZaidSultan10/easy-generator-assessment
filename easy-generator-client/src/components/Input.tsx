import React from "react";
import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  handleChange,
  value,
  inputStyles,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className={inputStyles}
      />
    </div>
  );
};

export default Input;
