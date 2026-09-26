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
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-[14px] font-semibold sm:px-6 sm:py-3 sm:text-[15px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${css ?? ""} ${text ?? ""} ${
        style === "danger" && `bg-[#F89A0B] border-[1px] border-[#F89A0B] shadow-[0_8px_20px_-8px_rgba(248,154,11,0.6)] hover:bg-[#E38A05] hover:border-[#E38A05] cursor-pointer`
      } ${style === "primary" && "bg-transparent border-[1px] border-white/50 text-[#F8FAFC] hover:bg-white hover:text-[#1A1A1A] hover:border-white cursor-pointer"} ${
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
