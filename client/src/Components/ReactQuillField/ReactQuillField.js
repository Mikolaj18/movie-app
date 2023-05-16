import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React from "react";

const ReactQuillField = ({value, onChange, formErrors, labelText}) => {
    return (
        <>
            <label className="form-label mt-3">{labelText}</label>
            <ReactQuill theme="snow" value={value} onChange={onChange} />
            {formErrors && <p style={{color: 'red', marginTop: '10px'}}>{formErrors}</p>}
        </>
    );
}

export default ReactQuillField;