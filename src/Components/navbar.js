import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function navbar() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "100%",
            alignItems: "center",
            borderBottom: "1px grey solid",
          }}
        >
          <Link to="/">
            <Button variant="text">Back</Button>
          </Link>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography variant="h5" sx={{fontWeight:'500'}}>Data Structure Visualization</Typography>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
