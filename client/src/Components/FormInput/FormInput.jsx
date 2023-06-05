import React, { forwardRef } from "react";

const FormInput = forwardRef(({ labelText, forLabel, className, formErrors, labelVisible = true, ...inputProps }, ref) => {
    return (
        <>
            <label className="form-label mt-3" htmlFor={forLabel}>{labelText}</label>
            <input
                {...inputProps}
                className={className}
                ref={ref}
            />
            {formErrors && <p style={{color: 'red', marginTop: '10px'}}>{formErrors}</p>}
        </>
    );
});

export default FormInput;
