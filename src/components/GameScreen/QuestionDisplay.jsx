/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * QuestionDisplay.jsx
 * This component displays the question text and options for answering.
 */
import he from 'he';
import { useState, useEffect } from 'react';

const QuestionDisplay = (props) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [shuffledOptions, setShuffledOptions] = useState([]);

    // this combines all incorrect and correct options and shuffles them
    useEffect(() => {
        setShuffledOptions([...props.incorrectOptions, props.correctOption].sort(() => Math.random() - 0.5));
        setSelectedOption(null);
    }, [props.incorrectOptions, props.correctOption]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        props.onSelect(option);
    };

    // this handles the coloring of the buttons
    const getButtonClass = (option) => {
        if (!selectedOption) return "btn btn-outline-primary m-2";
        if (option === props.correctOption) return "btn btn-success m-2";
        if (option === selectedOption) return "btn btn-danger m-2";
        return "btn btn-outline-primary m-2";
    };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-50">

        <div className="text-center mb-4">
            <h4>
                {he.decode(props.questionText)}
            </h4>
        </div>

        <div className="d-flex justify-content-center flex-wrap">
        {shuffledOptions.map((option, index) => (
            <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            >
                {he.decode(option)}
            </button>
        ))}
        </div>
    </div>
  );
};

export default QuestionDisplay;