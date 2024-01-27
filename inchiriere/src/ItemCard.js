// ItemCard.js
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function ItemCard({ title, text, imageData, details }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Conversie din base64 în URL pentru a afișa imaginea
    if (imageData) {
      fetch(`data:image/png;base64,${imageData}`)
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [imageData]);

  const [showPopover, setShowPopover] = useState(false);

  const handleButtonClick = () => {
    setShowPopover(!showPopover);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={imageSrc}
          style={{ width: "100%", height: "200px" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Header as="h3">Detalii</Popover.Header>
                <Popover.Body>
                  <p>{details}</p>
                </Popover.Body>
              </Popover>
            }
            show={showPopover}
          >
            <Button variant="primary" onClick={handleButtonClick}>
              Detalii
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </>
  );
}

export default ItemCard;
