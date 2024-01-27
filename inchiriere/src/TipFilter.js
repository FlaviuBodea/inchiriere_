// TipFilter.js
import React from "react";
import Form from "react-bootstrap/Form";

const TipFilter = ({ onSelect }) => {
  const tipuri = ["Toate", "Sedan", "SUV", "Coupe"];

  return (
    <Form.Select onChange={(e) => onSelect("tip", e.target.value)}>
      {tipuri.map((tip, index) => (
        <option key={index}>{tip}</option>
      ))}
    </Form.Select>
  );
};

export default TipFilter;
