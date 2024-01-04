import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const SelectionSort = () => {
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
      () => Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray);
  };

  const selectionSort = async () => {
    const arrayCopy = [...array];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      let minIndex = i;

      // Highlight the current minimum element
      gsap.to(arrayRef.current.children[i], {
        backgroundColor: "blue",
        duration: animationSpeed / 1000,
      });

      for (let j = i + 1; j < arrayCopy.length; j++) {
        // Highlight elements being compared
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: "blue",
          duration: animationSpeed / 1000,
        });

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        // If found a new minimum, update minIndex
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }

        // Reset background color
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: "lightblue",
          duration: animationSpeed / 1000,
        });
      }

      // Swap the found minimum element with the first element
      const temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[minIndex];
      arrayCopy[minIndex] = temp;

      // Animate swap
      gsap.to(arrayRef.current.children[i], {
        height: `${arrayCopy[i] * 10}px`,
        backgroundColor: "green",
        duration: animationSpeed / 1000,
      });

      gsap.to(arrayRef.current.children[minIndex], {
        height: `${arrayCopy[minIndex] * 10}px`,
        backgroundColor: "green",
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      // Reset background color
      gsap.to(arrayRef.current.children[i], {
        backgroundColor: "lightblue",
        duration: animationSpeed / 1000,
      });

      gsap.to(arrayRef.current.children[minIndex], {
        backgroundColor: "lightblue",
        duration: animationSpeed / 1000,
      });
    }

    // Set the last element in its final sorted position
    gsap.to(arrayRef.current.children[arrayCopy.length - 1], {
      backgroundColor: "green",
      duration: animationSpeed / 1000,
    });
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
            <Typography variant="h5">Selection Sort</Typography>
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
              <Typography variant="subtitle1">Animation Speed:</Typography>
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
          <Button variant="contained" onClick={selectionSort}>
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
              {/*  {value}   */}
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SelectionSort;
