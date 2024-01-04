import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const BinarySearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [targetIndex, setTargetIndex] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(500); // Default speed: 500ms
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const arrayRef = useRef(null);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 50) + 1,
    );
    setArray(newArray.sort((a, b) => a - b));
    setSearchValue("");
    setTargetIndex("N/A");
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

      setLeft(leftIndex);
      setRight(rightIndex);
      // Highlight Left
      gsap.to(arrayRef.current.children[leftIndex], {
        backgroundColor: "orange",
        duration: animationSpeed / 1000,
      });

      //Highlight Right
      gsap.to(arrayRef.current.children[rightIndex], {
        backgroundColor: "orange",
        duration: animationSpeed / 1000,
      });

      // Highlight mid (current middle element)
      gsap.to(arrayRef.current.children[mid], {
        backgroundColor: "blue",
        duration: animationSpeed / 1000,
      });

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));

      // Check if the middle element is the search value
      if (array[mid] === parseInt(searchValue)) {
        foundIndex = mid;
        gsap.to(arrayRef.current.children[foundIndex], {
          backgroundColor: "green",
          duration: 0,
        });

        setTargetIndex(foundIndex);
        return;
      } else if (array[mid] < parseInt(searchValue)) {
        // Highlight left
        gsap.to(arrayRef.current.children[leftIndex], {
          backgroundColor: "orange",
          duration: animationSpeed / 1000,
        });

        leftIndex = mid + 1;
        setLeft(leftIndex);
      } else {
        // Highlight right
        gsap.to(arrayRef.current.children[rightIndex], {
          backgroundColor: "orange",
          duration: animationSpeed / 1000,
        });

        rightIndex = mid - 1;
        setRight(rightIndex);
      }
    }

    setTargetIndex(foundIndex);
  };

  const resetColors = () => {
    gsap.to(arrayRef.current.children, {
      backgroundColor: "lightblue",
      duration: 0,
    });
  };

  const resetSearch = () => {
    setTargetIndex("N/A");
    setLeft(null);
    setRight(null);
    resetColors();
  };

  return (
    <Grid
      container
      sm={12}
      md={12}
      lg={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        sm={12}
        md={10}
        lg={10}
        my="1rem"
        width={"100%"}
        display="flex"
      >
        <Grid
          md={2}
          lg={2}
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h5">Binary Search</Typography>
          </Box>
        </Grid>
        <Grid
          item
          spacing={2}
          sm={12}
          md={9}
          lg={9}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <TextField
                  sx={{ width: "300px" }}
                  type="text"
                  label="Enter Value to Search"
                  variant="outlined"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Box>
              <Box>
                <Button variant="contained" onClick={binarySearch}>
                  Search
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" onClick={resetColors}>
                  Reset
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        sm={12}
        md={10}
        lg={10}
        my="1rem"
        width={"100%"}
        display="flex"
      >
        <Grid item md={7} lg={7}>
          <Stack direction="row" spacing={0}>
            <Box
              sx={{ width: "65%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <label>
                <Typography mr="1rem" variant="body1">
                  Array Size:
                </Typography>
              </label>
              <Slider
                sx={{ width: "65%" }}
                min={5}
                max={25}
                size="large"
                step={1}
                aria-label="Default"
                defaultValue={10}
                valueLabelDisplay="auto"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
              />
              <label>
                <Typography ml="1rem" variant="body1">
                  {arraySize}
                </Typography>
              </label>
            </Box>
            <Box>
              <Button variant="contained" onClick={generateRandomArray}>
                Generate Random Array
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={5} lg={5}>
          <Box display="flex" alignItems="center">
            <label>
              <Typography mr="1rem" variant="body1">
                Animation Speed:
              </Typography>
            </label>
            <Slider
              sx={{ width: "58%" }}
              min={100}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            />
            <label>
              <Typography ml="1rem" variant="body1">
                {animationSpeed} ms
              </Typography>
            </label>
          </Box>
        </Grid>
      </Grid>

      <Grid
        item
        md={12}
        lg={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box mt="5rem" display="flex" ref={arrayRef}>
          {array.map((value, index) => (
            <Box
              key={index}
              style={{
                width: "60px",
                height: "60px",
                backgroundColor:
                  index === targetIndex
                    ? "green"
                    : index == left || index == right
                      ? "orange"
                      : "lightblue",
                margin: "0 2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <Box>
                <Typography variant="body1">{value}</Typography>
              </Box>
              {index === targetIndex ? (
                <Box
                  style={{ position: "absolute", top: "-20px", color: "black" }}
                >
                  <Typography variant="subtitle1">Found!</Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          ))}
        </Box>
        <Box my="2rem">
          <Typography variant="h5">
            Index of Search Key: {targetIndex}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BinarySearch;
