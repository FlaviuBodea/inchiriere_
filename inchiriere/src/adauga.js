import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKdAySc9iK4tqzGTXbYiOUXh9o_NucuKQ",
  authDomain: "inchiriere-d8796.firebaseapp.com",
  projectId: "inchiriere-d8796",
  storageBucket: "inchiriere-d8796.appspot.com",
  messagingSenderId: "121700957174",
  appId: "1:121700957174:web:748c7752740e1dab1a25d7",
  measurementId: "G-YMKBTCMCLW",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Adauga = ({ showAddModal, setShowAddModal, onDataSubmit }) => {
  const [show, setShow] = useState(showAddModal || false);
  const location = useLocation();

  const handleClose = () => {
    setShow(false);
    setShowAddModal(false);
  };

  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    numeMasina: "",
    scurtaDescriere: "",
    descriereDetaliata: "",
    an: new Date(),
    tip: "Alege...",
    combustibil: "Alege...",
    imagine: null,
  });

  const [carImage, setCarImage] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      an: date,
    });
  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    const imageUrl = URL.createObjectURL(file);
    setCarImage(imageUrl);
    setFormData({
      ...formData,
      imagine: file,
    });
  };

  const adaugaMasinaInFirestore = async (masinaData) => {
    try {
      await addDoc(collection(db, "Masini"), masinaData);
      console.log("Document added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");

    try {
      // Convert the image file to a base64-encoded string
      const file = formData.imagine;
      const reader = new FileReader();

      reader.onloadend = async () => {
        const imageBase64 = reader.result.split(",")[1];

        const formDataForServer = {
          numeMasina: formData.numeMasina,
          scurtaDescriere: formData.scurtaDescriere,
          descriereDetaliata: formData.descriereDetaliata,
          an: formData.an.getFullYear().toString(),
          tip: formData.tip,
          combustibil: formData.combustibil,
          imagine: imageBase64,
        };

        console.log("Calling adaugaMasinaInFirestore...");
        await adaugaMasinaInFirestore(formDataForServer);

        console.log("Car added successfully!");
        onDataSubmit(formData);
        handleClose();
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adaugă Mașină
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adaugă Mașină Nouă</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="numeMasina">
              <Form.Label>Nume masina</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masina"
                name="numeMasina"
                value={formData.numeMasina}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="scurtaDescriere">
              <Form.Label>Scurta descriere</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descriere"
                name="scurtaDescriere"
                value={formData.scurtaDescriere}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="descriereDetaliata">
              <Form.Label>Descriere detaliată</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descriere detaliată"
                name="descriereDetaliata"
                value={formData.descriereDetaliata}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="an">
              <Form.Label>An</Form.Label>
              <DatePicker
                id="an"
                name="an"
                selected={formData.an}
                onChange={handleDateChange}
                dateFormat="yyyy"
                showYearPicker
              />
            </Form.Group>

            <Form.Group controlId="tip">
              <Form.Label>Tip</Form.Label>
              <Form.Select
                id="tip"
                name="tip"
                value={formData.tip}
                onChange={handleInputChange}
              >
                <option>Alege...</option>
                <option>Sedan</option>
                <option>Coupe</option>
                <option>SUV</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="combustibil">
              <Form.Label>Combustibil</Form.Label>
              <Form.Select
                id="combustibil"
                name="combustibil"
                value={formData.combustibil}
                onChange={handleInputChange}
              >
                <option>Alege...</option>
                <option>Benzina</option>
                <option>Motorina</option>
                <option>Electric</option>
              </Form.Select>
            </Form.Group>

            {/* Adaugă secțiunea pentru imagine */}
            <div>
              <label>Car Image:</label>
              <input
                type="file"
                accept="image/*"
                id="carImage"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {carImage && (
                <img
                  src={carImage}
                  alt="Car"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Adauga;
