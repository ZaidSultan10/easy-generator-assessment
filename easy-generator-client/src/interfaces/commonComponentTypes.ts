export interface InputProps {
  type: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputStyles: string;
}

export interface ButtonProps {
  isLoading?: boolean;
  title: string;
  buttonStyles: string;
  handleClick?: () => void;
}

export interface messageColorsProps {
  text: string;
  bgColor: string;
  borderColor: string;
}
