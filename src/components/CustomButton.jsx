import React from "react";

function CustomButton({
    children,
    onClick,
    ...props
}) {
    return (
        /* <button
            type={type}
            className={`btn custom-button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button> */
        <button 
            type="button" 
            id="btn-1" 
            onClick={onClick} 
            className="btn btn-primary btn-lg px-4 me-md-2"
            {...props}
        >
            {children}
        </button>

    );
} 

export default CustomButton;