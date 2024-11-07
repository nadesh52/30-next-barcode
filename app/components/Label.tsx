import React, { forwardRef } from "react";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Label = forwardRef<any, LabelProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-[22mm] w-[38mm] place-content-center place-items-center rounded-md text-center ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default Label;
