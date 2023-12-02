// Stack.js
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './stack.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

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
<Container fluid className='mt-2'>
{/*<div className="stack-container h-100"> */}
    <Row >
        <Col sm md lg="2" className='d-flex justify-content-end align-items-center'>
            <h4>Stack</h4>
        </Col>
        <Col className='d-flex flex-row justify-content-center align-items-center'>
            <div className='stack-controls d-flex flex-row h-auto justify-content-around align-items-center'>
                <div className='d-flex align-items-center'>
                    <label>
                        Stack Size:
                    </label>
                    <Form.Range
                        type="range"
                        min="5"
                        max="15"
                        value={stackSize}
                        onChange={handleStackSizeChange}
                    />
                    {stackSize}
                </div> 
                <div className='d-flex align-items-center'>
                    <label>Enter Value:</label>
                    <Form.Control
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            ref={inputRef}
                    />
                    
                    <Button className='mx-1' variant="secondary" onClick={pushToStack}>Push</Button>
                </div>
                <Button variant="secondary" onClick={popFromStack} disabled={stack.length === 0}>
                    Pop from Stack
                </Button>
            </div>
       
        </Col>
    </Row>
    <Row>
        <Col className='d-flex flex-row justify-content-center'>
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
        </Col>
        
    </Row>
    <Row className='d-flex justify-content-center align-items-center'>
        <Col className='d-flex flex-column justify-content-center align-items-center' >
            <div>{isOverflow && <div className="overflow-message">Stack Overflow! Stack is full.</div>}</div>
                <div className="d-flex stack-info justify-content-around align-items-center">
                    <div className='p-1'><strong>Top of Stack:</strong> {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}</div>
                    <div className='p-1'><strong>Index of Top:</strong> {stack.length > 0 ? stack.length - 1 : 'N/A'}</div>
                </div>
        </Col>
    </Row>
{/* </div> */}
</Container>
  );
};

export default Stack;
