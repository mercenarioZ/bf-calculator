import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        {...props}
        className="border border-slate-600 rounded p-2"
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
