import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BinarySearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [targetIndex, setTargetIndex] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(500); // Default speed: 500ms
  const arrayRef = useRef(null);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray.sort((a, b) => a - b));
    setSearchValue('');
    setTargetIndex(-1);
  };

  const binarySearch = async () => {
    resetColors();

    let left = 0;
    let right = array.length - 1;
    let mid, foundIndex = -1;

    for (let i = 0; i < array.length; i++) {
      gsap.to(arrayRef.current.children[i], {
        backgroundColor: 'lightblue',
        duration: animationSpeed / 1000, // Convert speed to seconds
      });
    }

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      // Highlight mid (current middle element)
      gsap.to(arrayRef.current.children[mid], {
        backgroundColor: 'blue',
        duration: animationSpeed / 1000,
      });

      // Highlight top and bottom elements
      const topIndex = left;
      const bottomIndex = right;

      gsap.to(arrayRef.current.children[topIndex], {
        backgroundColor: 'orange',
        duration: animationSpeed / 1000,
      });

      gsap.to(arrayRef.current.children[bottomIndex], {
        backgroundColor: 'orange',
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      // Check if the middle element is the search value
      if (array[mid] === parseInt(searchValue)) {
        foundIndex = mid;
        setTargetIndex(foundIndex);
        return;
      } else if (array[mid] < parseInt(searchValue)) {
        // Animation for changing top when moving right
        gsap.to(arrayRef.current.children[topIndex], {
          backgroundColor: 'lightblue',
          duration: animationSpeed / 1000,
        });
        left = mid + 1;
      } else {
        // Animation for changing bottom when moving left
        gsap.to(arrayRef.current.children[bottomIndex], {
          backgroundColor: 'lightblue',
          duration: animationSpeed / 1000,
        });
        right = mid - 1;
      }
    }

    setTargetIndex(foundIndex);
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: 'lightblue',
      duration: animationSpeed / 1000,
    });
    setTargetIndex(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Binary Search</h3>
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
      <button onClick={binarySearch}>Search</button>
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
      <div style={{ display: 'flex', marginTop: '30px', justifyContent:'center'}} ref={arrayRef}>
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
    </div>
    <div style={{ marginTop: '20px' }}>Index of Search Key: {targetIndex}</div>
    </div>
  );
};

export default BinarySearch;
