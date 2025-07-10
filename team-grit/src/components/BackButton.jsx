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
        <button className='btn btn-ghost back-button' onClick={handleBack}>
            <span className="back-icon">←</span>
            Back
        </button>
    );
}

export default BackButton