import React from "react";
import "./InputField.scss";

const InputField = ({ label, ...otherProps }) => {
	return (
		<div className="input-container">
			<input {...otherProps} className="input-field" />
			<label htmlFor={label} className={`${otherProps.value.length ? "shrink" : ""} input-label`}>
				{label}
			</label>
		</div>
	);
};

export default InputField;
