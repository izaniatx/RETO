import React from "react";

function CustomButton({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false
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
        >
            {children}
        </button>

    );
} 

export default CustomButton;