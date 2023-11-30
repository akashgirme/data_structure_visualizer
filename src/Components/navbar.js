import React from 'react';
import { Link } from 'react-router-dom';

function navbar() {
  return (
    <div>
       <nav style={{display: 'flex', alignItems:'center',justifyContent:'center', height:'50px', width: '100%'}}>
          <div style={{display:'flex', width:'80%', height:'100%', alignItems:'center', borderBottom:'1px grey solid'}}>
            <Link to="/">Back</Link>
            <div style={{display: 'flex', width:'100%', justifyContent:'center'}}>
                <h3>Data Structure Visualization</h3>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default navbar
