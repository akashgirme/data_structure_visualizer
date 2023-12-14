import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BubbleSort = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
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
  };

  const bubbleSort = async () => {
    const arrayCopy = [...array];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        // Highlight elements being compared
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: 'blue',
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[j + 1], {
          backgroundColor: 'blue',
          duration: animationSpeed / 1000,
        });

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        // Swap if needed
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;

          // Animate swap
          gsap.to(arrayRef.current.children[j], {
            height: `${arrayCopy[j] * 10}px`,
            backgroundColor: 'green',
            duration: animationSpeed / 1000,
          });

          


          gsap.to(arrayRef.current.children[j + 1], {
            height: `${arrayCopy[j + 1] * 10}px`,
            backgroundColor: 'green',
            duration: animationSpeed / 1000,
          });

          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        }

        // Reset background color
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: 'lightblue',
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[j + 1], {
          backgroundColor: 'lightblue',
          duration: animationSpeed / 1000,
        });
      }

      // Set the last element in its final sorted position
      gsap.to(arrayRef.current.children[arrayCopy.length - i - 1], {
        backgroundColor: 'green',
        duration: animationSpeed / 1000,
      });
    }

    // Set the first element in its final sorted position
    gsap.to(arrayRef.current.children[0], {
      backgroundColor: 'green',
      duration: animationSpeed / 1000,
    });
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: 'lightblue',
      duration:0,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h4>Bubble Sort</h4>
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
        <button onClick={bubbleSort}>Sort</button>
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
        <div style={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }} ref={arrayRef}>
          {array.map((value, index) => (
            <div
              key={index}
              style={{
                width: `${700 / arraySize}px`,
                height: `${value * 10}px`,
                backgroundColor: 'lightblue',
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
    </div>
  );
};

export default BubbleSort;
