import React from "react";
import "./Confirm.css";
function Confirm(props) {
  return props.trig ? (
    <div className="New">
      <div className="New-inner">
        <button className="close-butn" onClick={() => props.setTrig(false)}>
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Confirm;
