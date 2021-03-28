import React from "react";
import "react-bootstrap";
import "./brand.css"


// get our fontawesome imports
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Brand() {
  return (
    <>
      <span>
        <h1 className="brand">M<FontAwesomeIcon className="icon" icon={faFire}/>TCH't</h1>
      </span>
    </>
   );
} 

export default Brand;
