import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Array.css";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";

const ArrayAnimation = () => {
  const [arraySize, setArraySize] = React.useState(10); // Default array size
  const [squares, setSquares] = useState([]);
  const [inputNumber, setInputNumber] = useState("");
  const [indexToRemove, setIndexToRemove] = useState("");
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

    setInputNumber(""); // Clear the input field
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

    setIndexToRemove(""); // Clear the input field for indexToRemove
  };

  useEffect(() => {
    // Animate squares whenever the array changes
    gsap.fromTo(
      arrayRef.current,
      { opacity: 0, x: -50 }, // Initial state
      { opacity: 1, x: 0, stagger: 0.2, duration: 0.5, ease: "power3.out" }, // Final state
    );
  }, [squares]);

  return (
    <Grid
      container
      rowSpacing="2"
      display="flex"
      flexDirection="column"
      className="array-animation-container"
    >
      <Grid container columnSpacing={2} rowSpacing={2} mt="0.3rem">
        <Grid item lg={2} display="flex" justifyContent="end" alignItems="top">
          <Typography variant="h5">Array</Typography>
        </Grid>

        <Grid
          item
          lg={9}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" className="array-controls">
            <Box display="flex" alignItems="center">
              <Box display="flex" mr="0.8rem" alignItems="center">
                <TextField
                  varient="outlined"
                  label="Enter Element"
                  type="number"
                  value={inputNumber}
                  size="small"
                  onChange={(e) => setInputNumber(e.target.value)}
                  ref={inputRef}
                />
              </Box>
              <Box>
                <Button variant="contained" onClick={addSquare}>
                  Add Element
                </Button>
              </Box>
              <Box mx="2rem">
                <Button
                  variant="contained"
                  onClick={removeSquare}
                  disabled={squares.length === 0}
                >
                  Remove Last Element
                </Button>
              </Box>
            </Box>

            <Box mt="1rem" display="flex" alignItems="center">
              <Box>
                <TextField
                  label="Enter Index of Element"
                  type="number"
                  value={indexToRemove}
                  size="small"
                  onChange={(e) => setIndexToRemove(e.target.value)}
                />
              </Box>
              <Box ml="0.8rem">
                <Button variant="contained" onClick={removeSpecificSquare}>
                  Remove Element
                </Button>
              </Box>
            </Box>

            <Box mr="2rem" style={{ marginTop: "20px" }}>
              Array Size:
              <Slider
                min={5}
                max={15}
                step={1}
                value={arraySize}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setArraySize(newValue)}
              />
              {arraySize}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} display="flex" justifyContent="center">
        <Grid item lg={12} display="flex" justifyContent="center">
          <div className="array-display" ref={arrayRef}>
            <div
              className="array-border-top"
              style={{ width: `${arraySize * 77}px` }}
            />
            <div className="array-container">
              {squares.map((square, index) => (
                <div key={square.id} className="array-element">
                  <div>{square.number}</div>
                  <div className="array-index">{`${index}`}</div>
                </div>
              ))}
            </div>
            <div
              className="array-border-bottom"
              style={{ width: `${arraySize * 77}px` }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArrayAnimation;
