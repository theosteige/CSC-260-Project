import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'

function BackButton({ to }) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className='back-button'>
        <button onClick={handleBack}>
            Back
        </button>
        </div>
    );
}

export default BackButton