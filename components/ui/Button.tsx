import React from "react";

interface ButtonProps {
  children: React.ReactNode; // Correct type for children
  type: "button" | "submit" | "reset"; // Can be 'button', 'submit', or 'reset'
  fn?: () => void; // The function to be executed when the button is clicked
  loading?: boolean;
  disabled?: boolean;
  text?:string;
  style:
    | "danger"
    | "nobg"
    | "primary"
    | "reverse"
    | "reverseLight"
    | "secondary"
    | "disabled"
    | "tertiary";
  css?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fn,
  loading,
  disabled,
  style,
  css,
  text
}) => {
  return (
    <button
      onClick={fn}
      disabled={loading || disabled} // Disable the button when loading or manually disabled
      type={type}
      className={`flex  items-center justify-center whitespace-nowrap rounded-[99.53px] px-[24.29px] py-[15.55px] duration-150 ${css} ${text}  ${
        style === "danger" && `bg-[#F89A0B52] border-[1px] border-[#F89A0B] cursor-pointer`
      } ${style === "primary" && "bg-transparent border-[1px] border-[#F89A0B] text-[#F8FAFC] cursor-pointer"} ${
        style === "secondary" && "bg-fill-blueStrong text-text-strongInverse"
      } ${
        style === "disabled" && "bg-[#0000001A] text-text-strongInverse"
      } ${style === "reverse" && "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:bg-[#00000066] hover:shadow-raised"} ${style === "reverseLight" && "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:bg-[#51515114] hover:shadow-raised"} ${
        style === "tertiary" && "bg-[#9327DB] text-text-strongInverse"
      }
      `} // Add your button styles here
    >
      {children}
    </button>
  );
};

export default Button;
