import { cn } from "../../utils/utils";
import type { InputHTMLAttributes } from "react";

type InputVariant = "default" | "filled" | "outline";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const inputVariants: Record<InputVariant, string> = {
  default: "",
  filled: "",
  outline: "",
};

const inputSizes: Record<InputSize, string> = {
  sm: "",
  md: "",
  lg: "",
};

export default function Input({
  label,
  error,
  variant = "default",
  inputSize = "md",
  inputClassName,
  labelClassName,
  containerClassName,
  id,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label className={cn({ labelClassName })} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "font-medium rounded-xl",
          inputVariants[variant],
          inputSizes[inputSize],
          inputClassName,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
