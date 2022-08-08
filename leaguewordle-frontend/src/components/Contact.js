import React from "react";
import "./Contact.css";

function Contact(props) {
  return (
    <form
      target="_top"
      method="post"
      action="mailto:visualsteven@gmail.com"
      enctype="text/plain"
      onSubmit=""
    >
      <div className="contactInfo">
        <textarea class="input100" name="Bug/Issue"></textarea>
        <br />
        <input type="submit" value="Send" />
      </div>
    </form>
  );
}
export default Contact;
