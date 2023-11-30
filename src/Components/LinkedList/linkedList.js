import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
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

    setInputValue(''); // Clear the input field
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
          ease: 'power3.out',
        }
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
        { opacity: 0, y: -50, duration: 0.5, ease: 'power3.out' }
      );
    }
  };

  return (
    <div style={{ display: 'flex', position: 'relative', height: '100vh', justifyContent:'center' }}>
      <h3>LinkedList</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div>
          <label>
            Enter Value:
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
          </label>
          <button onClick={insertAtEnd}>Insert</button>
          <button onClick={deleteFromEnd} disabled={list.length === 0}>
            Delete
          </button>
        </div>
        <div style={{ marginTop: '50px', display: 'flex' }} ref={listRef}>
          {list.map((node, index) => (
            <div
              key={node.id}
              style={{
                position: 'relative',
                width: '150px',
                height: '80px',
                backgroundColor: 'green',
                margin: '0 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              <div>{node.value}</div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                }}
              >
                {index < list.length - 1 && (
                  <>
                    <div
                      style={{
                        height: '2px',
                        width: '30px',
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: '50%',
                        left: '20px',
                        transform: 'translate(-100%, -50%)',
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
