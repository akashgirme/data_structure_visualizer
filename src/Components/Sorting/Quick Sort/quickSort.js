import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const QuickSort = () => {
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

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);

      // Recursive calls to sort the sub-arrays
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // Highlight elements being compared
      gsap.to(arrayRef.current.children[j], {
        backgroundColor: 'blue',
        duration: animationSpeed / 1000,
      });

      gsap.to(arrayRef.current.children[high], {
        backgroundColor: 'orange',
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      if (arr[j] < pivot) {
        i++;

        // Swap arr[i] and arr[j]
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        // Animate swap
        gsap.to(arrayRef.current.children[i], {
          height: `${arr[i] * 10}px`,
          backgroundColor: 'green',
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[j], {
          height: `${arr[j] * 10}px`,
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
    }

    // Swap arr[i + 1] and arr[high] (pivot)
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    // Animate pivot placement
    gsap.to(arrayRef.current.children[i + 1], {
      height: `${arr[i + 1] * 10}px`,
      backgroundColor: 'green',
      duration: animationSpeed / 1000,
    });

    gsap.to(arrayRef.current.children[high], {
      height: `${arr[high] * 10}px`,
      backgroundColor: 'green',
      duration: animationSpeed / 1000,
    });

    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    // Reset background color
    gsap.to(arrayRef.current.children[high], {
      backgroundColor: 'lightblue',
      duration: animationSpeed / 1000,
    });

    return i + 1;
  };

  const sort = async () => {
    const arrayCopy = [...array];
    await quickSort(arrayCopy, 0, arrayCopy.length - 1);
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: 'lightblue',
      duration: animationSpeed / 1000,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Quick Sort</h3>
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
        <button onClick={sort}>Sort</button>
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
              {/*{value} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSort;
