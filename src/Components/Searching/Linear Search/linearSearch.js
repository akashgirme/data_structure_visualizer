import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const LinearSearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [targetIndex, setTargetIndex] = useState('N/A');
  const [animationSpeed, setAnimationSpeed] = useState(500); // Default speed: 500ms
  const arrayRef = useRef(null);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray);
    setSearchValue('');
    setTargetIndex('N/A');
  };

  const linearSearch = async () => {
    resetColors();

    let foundIndex = 'N/A';

    for (let i = 0; i < array.length; i++) {
      gsap.to(arrayRef.current.children[i], {
        backgroundColor: 'blue',
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      if (array[i] === parseInt(searchValue)) {
        foundIndex = i;
        setTargetIndex(foundIndex);
        return;
      }

      gsap.to(arrayRef.current.children[i], {
        backgroundColor: 'lightblue',
        duration: animationSpeed / 1000,
      });
    }

    setTargetIndex(foundIndex);
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: 'lightblue',
      duration: animationSpeed / 1000,
    });
    setTargetIndex('N/A');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Linear Search</h3>
      <div>
        <label>
          Array Size:
          <input
            type="range"
            min="1"
            max="25"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
          />
          {arraySize}
        </label>
        <button onClick={generateRandomArray}>Generate Random Array</button>
        <label>
          Enter Value to Search:
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        <button onClick={linearSearch}>Search</button>
        <button onClick={resetColors}>Reset</button>
        <label>
          Animation Speed:
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
          />
          {animationSpeed} ms
        </label>
      </div>
      <div style={{ display: 'flex', marginTop: '50px' }} ref={arrayRef}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              width: `${700 / arraySize}px`,
              height: '40px',
              backgroundColor:
                index === targetIndex
                  ? 'green'
                  : 'lightblue',
              margin: '0 2px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>Index of Search Key: {targetIndex}</div>
    </div>
  );
};

export default LinearSearch;
