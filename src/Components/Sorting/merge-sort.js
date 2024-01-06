import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const MergeSort = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(500); // Default speed: 500ms
  const arrayRef = useRef(null);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 50) + 1,
    );
    setArray(newArray);
  };

  const mergeSort = async () => {
    
    const merge = async (start, middle, end) => {
      const leftArray = array.slice(start, middle + 1);
      const rightArray = array.slice(middle + 1, end + 1);

      let i = 0,
        j = 0,
        k = start;

      while (i < leftArray.length && j < rightArray.length) {
        // Highlight elements being compared
        gsap.to(arrayRef.current.children[start + i], {
          backgroundColor: "blue",
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[middle + 1 + j], {
          backgroundColor: "blue",
          duration: animationSpeed / 1000,
        });

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        // Compare and merge
        if (leftArray[i] <= rightArray[j]) {
          array[k] = leftArray[i];
          i++;
        } else {
          array[k] = rightArray[j];
          j++;
        }

        // Animate merge
        gsap.to(arrayRef.current.children[k], {
          height: `${array[k] * 10}px`,
          backgroundColor: "green",
          duration: animationSpeed / 1000,
        });

        k++;
      }

      // Fill in remaining elements from leftArray
      while (i < leftArray.length) {
        array[k] = leftArray[i];

        // Animate merge
        gsap.to(arrayRef.current.children[k], {
          height: `${array[k] * 10}px`,
          backgroundColor: "green",
          duration: animationSpeed / 1000,
        });

        i++;
        k++;
      }

      // Fill in remaining elements from rightArray
      while (j < rightArray.length) {
        array[k] = rightArray[j];

        // Animate merge
        gsap.to(arrayRef.current.children[k], {
          height: `${array[k] * 10}px`,
          backgroundColor: "green",
          duration: animationSpeed / 1000,
        });

        j++;
        k++;
      }

      setArray([...array]);
    };

    const mergeSortHelper = async (start, end) => {
      if (start < end) {
        const middle = Math.floor((start + end) / 2);

        // Recursively sort the two halves
        await mergeSortHelper(start, middle);
        await mergeSortHelper(middle + 1, end);

        // Merge the sorted halves
        await merge(start, middle, end);
      }
    };

    // Start the merge sort algorithm
    await mergeSortHelper(0, array.length - 1);

    // Set all elements in their final sorted position
    for (let i = 0; i < array.length; i++) {
      gsap.to(arrayRef.current.children[i], {
        backgroundColor: "green",
        duration: animationSpeed / 1000,
      });
    }
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: "lightblue",
      duration: 0,
    });
  };

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      <Grid
        item
        md={10}
        lg={10}
        my="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={2} lg={2}>
          <Box>
            <Typography variant="h5">Merge Sort</Typography>
          </Box>
        </Grid>
        <Grid
          item
          md={10}
          lg={10}
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box>
            <label>
              <Typography variant="subtitle1">Array Size:</Typography>
            </label>
          </Box>
          <Box>
            <Slider
              sx={{ width: "300px" }}
              min={5}
              max={25}
              valueLabelDisplay="auto"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
            />
          </Box>
          <Box>
            <label>
              <Typography variant="subtitle1">{arraySize}</Typography>
            </label>
          </Box>
          <Button variant="contained" onClick={generateRandomArray}>
            Generate Random Array
          </Button>
          <Box>
            <label>
              <Typography variant="subtitle1">Animation Time:</Typography>
            </label>
          </Box>
          <Box>
            <Slider
              sx={{ width: "200px" }}
              min={100}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            />
          </Box>
          <Box>
            <label>
              <Typography variant="subtitle1">{animationSpeed} ms</Typography>
            </label>
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        md={5}
        lg={5}
        my="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box mx="1rem">
          <Button variant="contained" onClick={mergeSort}>
            Sort
          </Button>
        </Box>
        <Box mx="1rem">
          <Button variant="outlined" onClick={resetColors}>
            Reset
          </Button>
        </Box>
      </Grid>
      <Grid item md={12} lg={12}>
        <Box
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
          }}
          ref={arrayRef}
        >
          {array.map((value, index) => (
            <Box
              key={index}
              style={{
                width: `${900 / arraySize}px`,
                height: `${value * 10}px`,
                backgroundColor: "lightblue",
                margin: "0 2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {value}
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MergeSort;
