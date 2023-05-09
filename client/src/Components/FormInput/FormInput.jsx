import React, { forwardRef } from "react";

const FormInput = forwardRef(({ labelText, forLabel, className, ...inputProps }, ref) => {
    return (
        <>
            <label className="form-label" htmlFor={forLabel}>{labelText}</label>
            <input
                {...inputProps}
                className={className}
                ref={ref}
            />
            {/*{formErrors && <p style={{color: 'red', marginTop: '10px'}}>{formErrors}</p>}*/}
        </>
    );
});

export default FormInput;
