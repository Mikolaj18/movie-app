import React from 'react';
export const Form = ({children, className = false, onSubmit}) => {
    const formClasses = [
        className,
    ].filter(Boolean).join(" ");
    return (
        <form onSubmit={onSubmit} className={formClasses}>
            {children}
        </form>
    );
};

export default Form;