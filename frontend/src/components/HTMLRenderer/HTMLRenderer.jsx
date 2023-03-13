import React from "react";

const HTMLRenderer = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HTMLRenderer;
