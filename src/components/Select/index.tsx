import React, { SelectHTMLAttributes } from 'react';

import './style.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <div className="select-block">
            <label htmlFor={props.name}>{props.label}</label>
            <select value="" id={props.name} {...props}>
                <option value="" disabled defaultValue="" hidden>Selecione uma opção</option>
                {props.options.map(option => {
                    return <option key={option.value} label={option.label} value={option.value}></option>
                })}
            </select>
        </div>
    );
};

export default Select;