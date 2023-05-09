import React, { forwardRef } from "react";

const SelectField = forwardRef(({ labelText, forLabel, className, onChange, value, labelVisible = true, children, ...inputProps }, ref) => {
    return (
        <>
            {labelVisible && <label className="form-label mt-3" htmlFor={forLabel}>{labelText}</label>}
            <select {...inputProps} className={className} onChange={onChange} value={value} ref={ref}>
                {children}
            </select>
            {/*{formErrors && <p style={{color: 'red', marginTop: '10px'}}>{formErrors}</p>}*/}
        </>
    );
});

export default SelectField;
