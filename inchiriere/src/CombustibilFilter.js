// CombustibilFilter.js
import React from "react";
import Form from "react-bootstrap/Form";

const CombustibilFilter = ({ onSelect }) => {
  const combustibili = ["Toate", "Benzina", "Motorina", "Electric"];

  return (
    <Form.Select onChange={(e) => onSelect("combustibil", e.target.value)}>
      {combustibili.map((combustibil, index) => (
        <option key={index}>{combustibil}</option>
      ))}
    </Form.Select>
  );
};

export default CombustibilFilter;
