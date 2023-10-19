"use client";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", name = "", error = "", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <input className="input" type={type} name={name} ref={ref} {...props} />
        {error && (
          <p className="text-xs pl-1 text-red-600 dark:text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
