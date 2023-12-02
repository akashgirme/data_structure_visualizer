import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import './queue.css'; // Import the CSS file

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
    <Container>
        <Row className='my-2'>
            <Col sm md lg="2" className='d-flex justify-content-end align-items-center'>
                <h5>Queue</h5>
            </Col>
            <Col className='d-flex justify-content-center align-items-center'>
                <div className="d-flex align-items-center">
                    <label>
                        Enter Value:
                    </label>

                    <Form.Control
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        ref={inputRef}
                    />
                
                    <Button className='mx-1' variant='secondary' onClick={enqueue}>Enqueue</Button>
                    <Button className='mx-1' variant='secondary' onClick={dequeue} disabled={queue.length === 0}>
                        Dequeue
                    </Button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className='d-flex my-4 justify-content-center align-items-center'>
                <div className="queue" ref={queueRef}>
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
            </div>
       
            </Col>
        </Row>
        <Row className='d-flex justify-content-center align-items-center'>
            <Col className='d-flex justify-content-center align-items-center' >
                <div className="d-flex queue-info justify-content-around align-items-center">
                    <div className='p-1'><strong>Front of Queue:</strong> {queue.length > 0 ? queue[0].value : 'Empty'}</div>
                    <div className='p-1'><strong>Rear of Queue:</strong> {queue.length > 0 ? queue[queue.length - 1].value : 'Empty'}</div>
                </div>
            </Col>
        </Row>
      
    </Container>
  );
};

export default Queue;
