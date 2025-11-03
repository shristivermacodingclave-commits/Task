import React from 'react'
import './Button.css';
function Button({ name="Click" , onClick , className=""}) {
    return (
        <button
            className={`btn ${className} btn-outline-white signup-button enrolll animate__animated animate__fadeInUp fs-5`}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default Button ;