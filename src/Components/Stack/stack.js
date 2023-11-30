import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const Stack = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const stackRef = useRef(null);

  const pushToStack = () => {
    if (!inputValue.trim()) {
      return; // Don't push to stack if the input is empty
    }

    setStack((prevStack) => [...prevStack, { id: prevStack.length + 1, value: inputValue }]);
    setInputValue(''); // Clear the input field
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      return; // Don't pop from an empty stack
    }

    setStack((prevStack) => {
      const copy = [...prevStack];
      copy.pop();
      return copy;
    });
  };

  useEffect(() => {
    // Animate the last added element
    if (stackRef.current && stack.length > 0) {
      const lastElement = stackRef.current.children[stack.length - 1];

      gsap.fromTo(
        lastElement,
        { opacity: 0, y: -50 }, // Initial state
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' } // Final state
      );
    }
  }, [stack]);

  useEffect(() => {
    // Animate the removed element with ease-out
    if (stackRef.current && stack.length > 0) {
      const removedElement = stackRef.current.children[stack.length];

      gsap.fromTo(
        removedElement,
        { opacity: 1, y: 0 }, // Initial state
        { opacity: 0, y: -500, duration: 2, ease: 'power3.in' } // Final state with ease-out
      );
    }
  }, [stack]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <h3>Stack</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column-reverse'}} ref={stackRef}>
          {stack.map((item, index) => (
            <div
              key={item.id}
              style={{
                width: '200px',
                height: '50px',
                borderRadius: '10px',
                backgroundColor: 'green',
                margin: '2px 0',
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
                  top: '50%', // Position to the bottom of the square
                  right: '-30px',
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
          <strong>Top of Stack:</strong> {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}
          <br />
          <strong>Index of Top:</strong> {stack.length > 0 ? stack.length : 'N/A'}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px'}}>
          <label>
            Enter Value:
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
          </label>
          <button onClick={pushToStack}>Push to Stack</button>
          <button onClick={popFromStack} disabled={stack.length === 0}>
            Pop from Stack
          </button>
        </div>
    </div>
  );
};

export default Stack;