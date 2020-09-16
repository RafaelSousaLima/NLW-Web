import React, { TextareaHTMLAttributes } from 'react';

import './style.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
    return (
        <div className="textarea-block">
            <label htmlFor={props.name}>{props.label}</label>
            <textarea id={props.name} {...props} />
        </div>
    );
};

export default TextArea;