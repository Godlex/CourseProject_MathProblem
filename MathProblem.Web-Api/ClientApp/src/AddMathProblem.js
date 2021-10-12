import React, {Component, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';

export function AddMathProblem() {

    const [value, setValue] = React.useState();
    
    //save берем value (наш текст) и отправляем request
    
    return (
        <div className="container">
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown/>
        </div>
    );
}
