// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBarScroll from "./NavBarScroll";
import ItemCard from "./ItemCard";
import TipFilter from "./TipFilter";
import AnFilter from "./AnFilter";
import CombustibilFilter from "./CombustibilFilter";
import Adauga from "./adauga";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    tip: "Toate",
    an: "Toate",
    combustibil: "Toate",
  });

  useEffect(() => {
    // Fetch data from Firestore and replace existing data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5050/");
        const dataFromFirestore = await response.json();

        // Replace local data with data from Firestore
        setData(dataFromFirestore);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const applyFilters = (car) => {
    return (
      (filters.tip === "Toate" || car.tip === filters.tip) &&
      (filters.an === "Toate" || car.an === filters.an) &&
      (filters.combustibil === "Toate" ||
        car.combustibil === filters.combustibil)
    );
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleDataSubmit = (newCarData) => {
    setData((prevData) => [
      ...prevData,
      {
        title: newCarData.numeMasina,
        text: newCarData.scurtaDescriere,
        tip: newCarData.tip,
        an: newCarData.an.getFullYear().toString(),
        combustibil: newCarData.combustibil,
        details: {
          description: newCarData.descriereDetaliata,
          additionalInfo: "Informații suplimentare despre mașină",
        },
        imageData: newCarData.imagine,
        id: newCarData.id, // Adaugă ID-ul furnizat de baza de date
      },
    ]);
  };

  return (
    <Router>
      <Container className="Container">
        <NavBarScroll handleShowAddModal={() => setShowAddModal(true)} />
        <div className="Carousel mt-4 custom-carousel">
          <Carousel>
            {data.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 mx-auto custom-carousel-image"
                  src={`data:image/png;base64,${item.imagine}`}
                  alt={`Slide ${index + 1}`}
                />
                <Carousel.Caption>
                  <h3>{item.numeMasina}</h3>
                  <p>{item.scurtaDescriere}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <hr className="my-4" />
        <Row className="mb-3">
          <Col>
            <TipFilter onSelect={handleFilterChange} />
          </Col>
          <Col>
            <AnFilter onSelect={handleFilterChange} />
          </Col>
          <Col>
            <CombustibilFilter onSelect={handleFilterChange} />
          </Col>
        </Row>
        <div className="ItemList">
          <Row xs={1} md={2} lg={3} className="g-4">
            {data.filter(applyFilters).map((item, index) => (
              <Col key={index}>
                <ItemCard
                  title={item.numeMasina}
                  text={item.scurtaDescriere}
                  imageData={item.imagine}
                  details={item.descriereDetaliata}
                />
              </Col>
            ))}
          </Row>
        </div>
        <hr className="my-4" />
        <Routes>
          <Route
            path="/adauga"
            element={
              <Adauga
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                onDataSubmit={handleDataSubmit}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
