import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useEffect } from 'react';
import { ListGroup } from "react-bootstrap";

const SongList = ({ selectedItem, onItemSelect }, props) => {
  return (
    <ListGroup>
      <ListGroup.Item
        active={selectedItem === "item1"}
        onClick={() => onItemSelect("item1")}
      >
        Item 1
      </ListGroup.Item>
      <ListGroup.Item
        active={selectedItem === "item2"}
        onClick={() => onItemSelect("item2")}
      >
        Item 2
      </ListGroup.Item>
      <ListGroup.Item
        active={selectedItem === "item3"}
        onClick={() => onItemSelect("item3")}
      >
        Item 3
      </ListGroup.Item>
      <ListGroup.Item
        active={selectedItem === "item4"}
        onClick={() => onItemSelect("item4")}
      >
        Item 4
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SongList;
