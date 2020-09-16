import React, { InputHTMLAttributes } from 'react';

import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="input-block">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} id={props.name} {...props} />
        </div>
    );
};

export default Input;