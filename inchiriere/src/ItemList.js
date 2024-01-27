// ItemList.js

import React from "react";
import ItemCard from "./ItemCard";

const ItemList = ({ data }) => {
  return (
    <div className="CardContainer">
      {data.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemList;
