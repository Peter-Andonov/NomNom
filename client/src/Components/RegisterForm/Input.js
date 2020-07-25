import React from 'react';

const Input = (props) => {

    const handleChange = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={handleChange}
                onBlur={props.onBlur}
            />
            {props.error && <div>Invalid email</div>}
        </div>
    )
};

export default Input;