import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    // State to track toggled cards
    const [toggledCards, setToggledCards] = useState({});

    const handleCardClick = (index) => {
        setToggledCards((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the state of the clicked card
        }));
    };

    const renderCard = (title, text, index) => {
        const isToggled = toggledCards[index];
        return (
            <div className="col-md-4 d-flex justify-content-center" key={index}>
                <div
                    className={`card ${isToggled ? 'bg-primary text-white' : 'bg-light'} shadow border-0`}
                    style={{ width: '18rem', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                    onClick={() => handleCardClick(index)} // Toggle color on click
                >
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold">{title}</h5>
                        <p className="card-text">{text}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4 text-uppercase fw-bold">Responsive Card Layout</h1>
            {/* Row 1 */}
            <div className="row g-4">
                {renderCard('Card 1', 'Click to toggle color', 1)}
                {renderCard('Card 2', 'Click to toggle color', 2)}
                {renderCard('Card 3', 'Click to toggle color', 3)}
            </div>
            {/* Row 2 */}
            <div className="row g-4 mt-4">
                {renderCard('Card 4', 'Click to toggle color', 4)}
                {renderCard('Card 5', 'Click to toggle color', 5)}
                {renderCard('Card 6', 'Click to toggle color', 6)}
            </div>
        </div>
    );
};

export default App;
