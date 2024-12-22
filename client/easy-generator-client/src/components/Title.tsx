import React from "react";

const Title = ({ text, titleStyles }) => {
  return (
    <div>
      <p className={titleStyles}>{text}</p>
    </div>
  );
};

export default Title;
