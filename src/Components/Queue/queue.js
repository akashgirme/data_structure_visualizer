// Queue.js
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

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

    <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Stack</h3>
      <div style={{ display: 'flex', top: '20%', position: 'absolute' }} ref={queueRef}>
        {queue.map((item, index) => (
          <div
            key={item.id}
            style={{
              width: '50px',
              height: '200px',
              borderRadius: '10px',
              backgroundColor: 'blue',
              margin: '0px 2px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              position: 'relative',
            }}
          >
            {item.value}
            <div
              style={{
                position: 'absolute',
                display: 'none',
                top: '50%', // Position to the bottom of the square
                transform: 'translateY(-50%)',
                color: 'black',
              }}
            >
              {`${index}`}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Front of Queue:</strong> {queue.length > 0 ? queue[0].value : 'Empty'}
        <br />
        <strong>Rear of Queue:</strong> {queue.length > 0 ? queue[queue.length - 1].value : 'Empty'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <label>
          Enter Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
        </label>
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue} disabled={queue.length === 0}>
          Dequeue
        </button>
      </div>
    </div>
  );
};

export default Queue;
