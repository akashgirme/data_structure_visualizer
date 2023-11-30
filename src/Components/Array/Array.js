import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const ArrayAnimation = () => {
  const [arraySize, setArraySize] = useState(10); // Default array size
  const [squares, setSquares] = useState([]);
  const [inputNumber, setInputNumber] = useState('');
  const [indexToRemove, setIndexToRemove] = useState('');
  const inputRef = useRef(null);
  const arrayRef = useRef(null);

  const addSquare = () => {
    if (!inputNumber.trim() || squares.length >= arraySize) {
      return; // Don't add square if the input is empty or the array is full
    }

    setSquares((prevSquares) => [
      ...prevSquares,
      { id: prevSquares.length + 1, number: inputNumber },
    ]);

    setInputNumber(''); // Clear the input field
  };

  const removeSquare = () => {
    if (squares.length === 0) {
      return; // Don't remove from an empty array
    }

    setSquares((prevSquares) => {
      const copy = [...prevSquares];
      copy.pop(); // Remove the last element
      return copy;
    });
  };

  const removeSpecificSquare = () => {
    setSquares((prevSquares) => {
      const index = parseInt(indexToRemove);
      if (!isNaN(index) && index >= 0 && index < prevSquares.length) {
        const copy = [...prevSquares];
        copy.splice(index, 1); // Remove the specified element
        return copy;
      }
      return prevSquares;
    });

    setIndexToRemove(''); // Clear the input field for indexToRemove
  };

  useEffect(() => {
    // Animate squares whenever the array changes
    gsap.fromTo(
      arrayRef.current,
      { opacity: 0, x: -50 }, // Initial state
      { opacity: 1, x: 0, stagger: 0.2, duration: 0.5, ease: 'power3.out' } // Final state
    );
  }, [squares]);

  return (
    <div style={{ display: 'flex', position: 'relative', height: '100vh', justifyContent:'center' }}>
    <h3>Array</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
      <div style={{padding:'5px'}}>
      <label>
        Enter Number:
        <input
          type="number"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          ref={inputRef}
        />
      </label>
      <button onClick={addSquare}>Add Element</button>
      <button onClick={removeSquare} disabled={squares.length === 0}>
        Remove Last Element
      </button>
      </div>
      <div style={{marginTop:'10px'}}>
        Enter index of element to remove:
        <input
          type="number"
          value={indexToRemove}
          onChange={(e) => setIndexToRemove(e.target.value)}
        />
        <button onClick={removeSpecificSquare}>Remove Element</button>
      </div>
      <div style={{marginTop:'20px'}}>
        Array Size:
        <input
          type="range"
          min="5"
          max="15"
          step="1"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
        />
        {arraySize}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '50px',
          position: 'relative',
          width: `${arraySize * 50}px`, // Assuming each square has a width of 50px
        }}
        ref={arrayRef}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            borderBottom: '1px solid black',
          }}
        />
        {squares.map((square, index) => (
          <div
            key={square.id}
            style={{
              position: 'relative',
              width: '50px',
              height: '50px',
              backgroundColor: 'blue',
              margin: '0 1px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div>{square.number}</div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px', // Adjust this value to control the distance from the square
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'black',
              }}
            >
              {`${index}`}
            </div>
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            top: '50px',
            width: '100%',
            borderTop: '1px solid black',
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default ArrayAnimation;