import React from 'react';
import './NewButton.css';

function NewButton(props) {
    return (
        <button 
            className="NewButton"
            onClick={props.onClick}
        />
    )
}

export default NewButton;