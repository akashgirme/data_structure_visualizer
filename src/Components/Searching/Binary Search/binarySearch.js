import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BinarySearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [targetIndex, setTargetIndex] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(500); // Default speed: 500ms
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
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
    setLeft(null);
    setRight(null);
  };

  const binarySearch = async () => {
    resetColors();

    let leftIndex = 0;
    let rightIndex = array.length - 1;
    let foundIndex = -1;

    while (leftIndex <= rightIndex) {
      const mid = Math.floor((leftIndex + rightIndex) / 2);

      // Highlight mid (current middle element)
      gsap.to(arrayRef.current.children[mid], {
        backgroundColor: 'blue',
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      // Check if the middle element is the search value
      if (array[mid] === parseInt(searchValue)) {
        foundIndex = mid;
        setTargetIndex(foundIndex);
        return;
      } else if (array[mid] < parseInt(searchValue)) {
        // Highlight left
        setLeft(leftIndex);
        gsap.to(arrayRef.current.children[leftIndex], {
          backgroundColor: 'orange',
          duration: animationSpeed / 1000,
        });

        leftIndex = mid + 1;
      } else {
        // Highlight right
        setRight(rightIndex);
        gsap.to(arrayRef.current.children[rightIndex], {
          backgroundColor: 'orange',
          duration: animationSpeed / 1000,
        });

        rightIndex = mid - 1;
      }
    }

    setTargetIndex(foundIndex);
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: 'lightblue',
      duration: animationSpeed / 1000,
    });

    if (left !== null) {
      gsap.to(arrayRef.current.children[left], {
        backgroundColor: 'orange',
        duration: animationSpeed / 1000,
      });
    }

    if (right !== null) {
      gsap.to(arrayRef.current.children[right], {
        backgroundColor: 'orange',
        duration: animationSpeed / 1000,
      });
    }
  };

  const resetSearch = () => {
    setTargetIndex(-1);
    setLeft(null);
    setRight(null);
    resetColors();
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
        <button onClick={resetSearch}>Reset Search</button>
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
        <div style={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }} ref={arrayRef}>
          {array.map((value, index) => (
            <div
              key={index}
              style={{
                width: `${700 / arraySize}px`,
                height: '40px',
                backgroundColor:
                  index === targetIndex
                    ? 'green'
                    : index === left || index === right
                    ? 'orange'
                    : 'lightblue',
                margin: '0 2px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                position: 'relative',
              }}
            >
              <div>{value}</div>
              {index === targetIndex && (
                <div style={{ position: 'absolute', top: '-20px', color: 'black' }}>Found!</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>Index of Search Key: {targetIndex !== -1 ? targetIndex : 'N/A'}</div>
    </div>
  );
};

export default BinarySearch;
