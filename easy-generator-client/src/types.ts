export interface ButtonProps {
  isLoading?: boolean;
  title: string;
  buttonStyles: string;
  handleClick?: () => void;
}

export interface InputProps {
  type: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputStyles: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}
