import React from "react";
import "../assets/css/Popup.css";
function PopupWon(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          shape="circle"
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        >
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupWon;
