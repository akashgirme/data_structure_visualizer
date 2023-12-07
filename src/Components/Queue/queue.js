import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './queue.css'; // Import the CSS file
import { Typography } from '@mui/material';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const queueRef = useRef(null);
  const [lastOperation, setLastOperation] = useState(null);

  const enqueue = () => {
    if (!inputValue.trim()) {
      return; // Don't enqueue if the input is empty
    }

    setQueue((prevQueue) => [...prevQueue, { id: prevQueue.length + 1, value: inputValue }]);
    setInputValue(''); // Clear the input field
    setLastOperation('enqueue');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      return; // Don't dequeue from an empty queue
    }

    setQueue((prevQueue) => {
      const copy = [...prevQueue];
      const removedElement = copy.shift(); // Remove the element from the front
      setLastOperation({ type: 'dequeue', removedElement });
      return copy;
    });
  };

  useEffect(() => {
    // Animate the last enqueued element
    if (queueRef.current && lastOperation && lastOperation.type === 'enqueue') {
      const lastElement = queueRef.current.children[queue.length - 1];
  
      gsap.fromTo(
        lastElement,
        { opacity: 0, y: -100 }, // Initial state
        { opacity: 1, y: 0, duration: 2, ease: 'power3.out', immediateRender: false } // Final state
      );
    }
  
    // Animate the dequeued element with ease-out
    if (queueRef.current && lastOperation && lastOperation.type === 'dequeue') {
      const removedElement = lastOperation.removedElement;
      
      gsap.fromTo(
        removedElement,
        { opacity: 1, y: 0 }, // Initial state
        { opacity: 0, y: 100, duration: 0.5, ease: 'power3.in' } // Final state with ease-out
      );
    }
  }, [queue, lastOperation]);

  return (
    <Grid container rowSpacing={2}>
        <Grid container columnSpacing={2} mt='2rem'>
            <Grid item lg={2} display='flex' justifyContent='flex-end' alignItems='center'>
                <Typography variant='h5'>Queue</Typography>
            </Grid>
            <Grid item lg={9} display='flex' justifyContent='center' alignItems='center'>
                <Box display='flex' alignItems='center'>
                    <TextField
                        type="number"
                        label='Enter Element'
                        value={inputValue}
                        size='small'
                        onChange={(e) => setInputValue(e.target.value)}
                        ref={inputRef}
                    />
                
                    <Box ml='0.5rem'><Button variant='contained' onClick={enqueue}>Enqueue</Button></Box>
                    <Box ml='2rem'><Button variant='contained' onClick={dequeue} disabled={queue.length === 0}>
                        Dequeue
                    </Button></Box>
                </Box>
            </Grid>
        </Grid>
        <Grid container mt='2rem' display='flex' justifyContent='center'>
            <Grid lg={11} display='flex' my='3rem' justifyContent='center' alignItems='center'>
              <Box display='flex' justifyContent='center' className="queue" ref={queueRef}>
                {queue.map((item, index) => (
                <div
                    key={item.id}
                    className="queue-item"
                >
                    {item.value}
                    <div className="index-label">
                    {`${index}`}
                    </div>
                </div>
                ))}
              </Box>
            </Grid>
        </Grid>
        <Grid container display='flex' justifyContent='center' alignItems='center'>
          <Grid item lg={4}>
            <Box display='flex' justifyContent='space-around' alignItems='center'>
              <Typography variant='h5' display='flex'><strong>Front of Queue:</strong> {queue.length > 0 ? queue[0].value : 'Empty'}</Typography>
              <Typography variant='h5' display='flex'><strong>Rear of Queue:</strong> {queue.length > 0 ? queue[queue.length - 1].value : 'Empty'}</Typography>
            </Box>
          </Grid>
        </Grid>
      
    </Grid>
  );
};

export default Queue;
