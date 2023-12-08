// Stack.js
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './stack.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Typography } from '@mui/material';


const Stack = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [stackSize, setStackSize] = useState(5);
  const [isOverflow, setIsOverflow] = useState(false);
  const inputRef = useRef(null);
  const stackRef = useRef(null);

  const pushToStack = () => {
    if (!inputValue.trim()) {
      return;
    }

    if (stack.length >= stackSize) {
      setIsOverflow(true);
      return;
    }

    setStack((prevStack) => [
      ...prevStack,
      { id: prevStack.length + 1, value: inputValue },
    ]);
    setInputValue('');
    setIsOverflow(false);
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      return;
    }

    setStack((prevStack) => {
      const copy = [...prevStack];
      copy.pop();
      return copy;
    });
    setIsOverflow(false);
  };

  const handleStackSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setStackSize(newSize);
    setIsOverflow(false);
  };

  useEffect(() => {
    if (stackRef.current && stack.length > 0) {
      const lastElement = stackRef.current.children[stack.length - 1];

      gsap.fromTo(
        lastElement,
        { opacity: 0, y: -70 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.in' }
      );
    }
  }, [stack]);

  useEffect(() => {
    if (stackRef.current && stack.length > 0) {
      const removedElement = stackRef.current.children[stack.length];

      gsap.fromTo(
        removedElement,
        { opacity: 1, y: 0 },
        { opacity: 0, x: 0, duration: 0.75, ease: 'power3.out' }
      );
    }
  }, [stack]);

  return (
  <Grid container rowSpacing={2} display='flex' flexDirection='column'>
      <Grid conatiner columnSpacing={2} mt='1rem' display='flex' alignItems='center'>
        <Grid item md lg={2} display='flex' justifyContent='end'>
            <Typography variant='h5'>Stack</Typography>
        </Grid>
        <Grid item md lg={8} display="flex" justifyContent='center' alignItems='center'>
            <Box display='flex' justifyContent='between' alignItems='center'>
                <Box mr='1rem' display='flex' alignItems='center' sx={{width:'350px'}}>
                    <label>
                        Stack Size:
                    </label>
                    <Slider
                        type="range"
                        min={5}
                        max={15}
                        step={1}
                        label={stackSize}
                        value={stackSize}
                        valueLabelDisplay='auto'
                        onChange={handleStackSizeChange}
                    />
                    {stackSize}
                </Box> 
                <Box display='flex' alignItems='center'>
                    <TextField
                            type="number"
                            label="Enter Element"
                            size='small'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            ref={inputRef}
                    />
                    <Box ml='0.5rem'><Button className='mx-1' variant="contained" onClick={pushToStack}>Push</Button></Box>
                    <Box ml='2rem'><Button variant="contained" onClick={popFromStack} disabled={stack.length === 0}>
                      Pop from Stack
                    </Button></Box>
                </Box>
                
            </Box>
       
        </Grid>
      </Grid>
    <Grid item>
        <Grid display='flex' justifyContent='center'>
            <div className='stack-content d-flex flex-column justify-content-end align-items-center'>
                <div className="stack-elements" ref={stackRef}>
                    {stack.map((item, index) => (
                        <div key={item.id} className="stack-element">
                            {item.value}
                            <div className="index-indicator">{`${index}`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Grid>
        
    </Grid>
    <Grid item md lg={12}>
      <Grid mt='1.5rem' display='flex' justifyContent='center' alignItems='center'>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{width:'70%'}}>
              <Box>{isOverflow && <div className="overflow-message">Stack Overflow! Stack is full.</div>}</Box>
              <Box className="d-flex stack-info justify-content-around align-items-center">
                <Typography variant='h6' p='1'><strong>Top of Stack:</strong> {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}</Typography>
                <Typography variant='h6' p='1'><strong>Index of Top:</strong> {stack.length > 0 ? stack.length - 1 : 'N/A'}</Typography>
              </Box>
          </Box>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default Stack;
