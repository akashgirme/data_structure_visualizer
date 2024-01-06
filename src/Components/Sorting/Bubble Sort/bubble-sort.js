import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const BubbleSort = () => {
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

  const bubbleSort = async () =>{

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // Highlight elements being compared
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: "blue",
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[j + 1], {
          backgroundColor: "blue",
          duration: animationSpeed / 1000,
        });

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        // Swap if needed
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          

          // Animate swap
          gsap.to(arrayRef.current.children[j], {
            height: `${array[j] * 10}px`,
            backgroundColor: "green",
            duration: animationSpeed / 1000,
          });

          gsap.to(arrayRef.current.children[j + 1], {
            height: `${array[j + 1] * 10}px`,
            backgroundColor: "green",
            duration: animationSpeed / 1000,
          });

          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
          setArray([...array]);
        }


        // Reset background color
        gsap.to(arrayRef.current.children[j], {
          backgroundColor: "lightblue",
          duration: animationSpeed / 1000,
        });

        gsap.to(arrayRef.current.children[j + 1], {
          backgroundColor: "lightblue",
          duration: animationSpeed / 1000,
        });
      }

      // Set the last element in its final sorted position
      gsap.to(arrayRef.current.children[array.length - i - 1], {
        backgroundColor: "green",
        duration: animationSpeed / 1000,
      });
    }

    // Set the first element in its final sorted position
    gsap.to(arrayRef.current.children[0], {
      backgroundColor: "green",
      duration: animationSpeed / 1000,
    });

    
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: "lightblue",
      duration: 0,
    });
    generateRandomArray();
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
            <Typography variant="h5">Bubble Sort</Typography>
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
          <Button variant="contained" onClick={bubbleSort}>
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

export default BubbleSort;
