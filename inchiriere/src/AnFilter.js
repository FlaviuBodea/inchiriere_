// AnFilter.js
import React from "react";
import Form from "react-bootstrap/Form";

const AnFilter = ({ onSelect }) => {
  const ani = ["Toate", "2022", "2021", "2020", "2019"];

  return (
    <Form.Select onChange={(e) => onSelect("an", e.target.value)}>
      {ani.map((an, index) => (
        <option key={index}>{an}</option>
      ))}
    </Form.Select>
  );
};

export default AnFilter;
