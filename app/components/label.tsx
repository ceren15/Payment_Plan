import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className = "", ...props }: LabelProps) => {
    return (
        <label
            className={`text-sm font-medium text-gray-700 block mb-1 ${className}`}
            {...props}
        />
    );
};
