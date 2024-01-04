import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      return; // Don't insert if the input is empty
    }

    const newNode = { id: list.length + 1, value: inputValue, next: null };

    setList((prevList) => {
      const copy = [...prevList, newNode];
      animateInsert(newNode); // Animate the insertion
      return copy;
    });

    setInputValue(""); // Clear the input field
  };

  const deleteFromEnd = () => {
    if (list.length === 0) {
      return; // Don't delete from an empty list
    }

    setList((prevList) => {
      const removedNode = prevList[prevList.length - 1];
      const copy = prevList.slice(0, -1);
      animateDelete(removedNode); // Animate the deletion
      return copy;
    });
  };

  const animateInsert = (newNode) => {
    if (listRef.current) {
      const newNodeIndex = list.length;
      const newNodeElement = listRef.current.childNodes[newNodeIndex];

      gsap.fromTo(
        newNodeElement,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }
  };

  const animateDelete = (removedNode) => {
    if (listRef.current) {
      const removedNodeIndex = removedNode.id - 1;
      const removedNodeElement = listRef.current.childNodes[removedNodeIndex];

      gsap.fromTo(
        removedNodeElement,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, duration: 0.5, ease: "power3.out" },
      );
    }
  };

  return (
    <Grid display="flex" flexDirection="column">
      <Grid container mt="1rem">
        <Grid item lg={2} display="flex" justifyContent="end">
          <Typography variant="h5">LinkedList</Typography>
        </Grid>
        <Grid item lg={8} display="flex" justifyContent="center">
          <Box display="flex">
            <TextField
              type="text"
              label="Enter Element"
              value={inputValue}
              size="small"
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
            <Box ml="1rem">
              <Button variant="contained" onClick={insertAtEnd}>
                Insert
              </Button>
            </Box>
            <Box ml="2rem">
              <Button
                variant="contained"
                onClick={deleteFromEnd}
                disabled={list.length === 0}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Box display="flex" mt="10rem" ref={listRef}>
          {list.map((node, index) => (
            <div
              key={node.id}
              style={{
                position: "relative",
                width: "150px",
                height: "80px",
                backgroundColor: "green",
                margin: "0 10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <div>{node.value}</div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  color: "black",
                }}
              >
                {index < list.length - 1 && (
                  <>
                    <div
                      style={{
                        height: "4px",
                        width: "30px",
                        backgroundColor: "black",
                        position: "absolute",
                        top: "50%",
                        left: "20px",
                        transform: "translate(-100%, -50%)",
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default LinkedList;
