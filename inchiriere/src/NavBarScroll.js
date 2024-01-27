// NavBarScroll.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import "./NavBarScroll.css";
import Badge from "react-bootstrap/Badge";

const NavBarScroll = ({ handleShowAddModal }) => {
  const [showDespreNoiModal, setShowDespreNoiModal] = useState(false);
  const [showServiciiModal, setShowServiciiModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleDespreNoiClick = () => {
    setShowDespreNoiModal(true);
  };

  const handleServiciiNoiClick = () => {
    setShowServiciiModal(true);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCloseDespreNoiModal = () => {
    setShowDespreNoiModal(false);
  };

  const handleCloseServiciiModal = () => {
    setShowServiciiModal(false);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="custom-brand">
            Rent a Car
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="navbar-nav ms-auto">
              <Nav.Link href="/" className="custom-link">
                Acasă
              </Nav.Link>
              <Nav.Link
                href="#"
                className="custom-link"
                onClick={handleDespreNoiClick}
              >
                Despre Noi
              </Nav.Link>
              <Nav.Link
                href="#"
                className="custom-link"
                onClick={handleServiciiNoiClick}
              >
                Servicii
              </Nav.Link>
              <Nav.Link
                href="#"
                className="custom-link"
                onClick={handleContactClick}
              >
                Contact
              </Nav.Link>
              <Nav.Link
                href="/adauga"
                className="custom-link"
                onClick={handleShowAddModal}
              >
                Adaugă
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal pentru "Despre Noi" */}
      <Modal show={showDespreNoiModal} onHide={handleCloseDespreNoiModal}>
        <Modal.Header closeButton>
          <Modal.Title>Despre Companie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Informațiile statice despre companie */}
          <p>Despre noi</p>
          <p>
            Istoria companiei incepe in 1918, in SUA cand W.L. Jacobs a avut o
            idee revolutionara, acea de a infiinta primul birou de inchirieri
            auto din lume, in Chicago, SUA. A achizitionat si si-a repart
            propriile autoturisme, cele 12 modele second hand de la Ford, model
            T. De atunci compania a crescut si s-a extins rapid, devenind cea
            mai mare companie de inchirieri auto din lume si ramanand liderul de
            inchirieri auto de aproape un secol. In 1961, Hertz si-a deschis
            primul birou in Atena, Grecia si in 1974 Autohellas ATEE a obtinut
            franciza pentru Grecia. Autotechnica Fleet Services este franciza,
            detinuta de catre Autohellas ATEE, care a intrat pe piata din
            Romania in 2007 si la scurt timp a devenit un jucator important pe
            segmentul de inchirieri auto si leasing operational.{" "}
          </p>

          <p>
            Oferim servicii complete de inchirieri auto, pe termen scurt, lung,
            lunare sau servicii de leasing operational si fleet management.
            Flota din Romania este compus din 2500 autoturisme ce acopera o gama
            larga de modele si grupe de masini. Hertz Romania este una din
            companiile cele mai bine reprezentate la nivel national, fiind
            prezenta in 3 orase: Bucharest, Cluj- Napoca, Timișoara
          </p>
          {/* Poți adăuga orice alte informații aici */}

          {/* Butonul pentru închidere */}
          <Button variant="secondary" onClick={handleCloseDespreNoiModal}>
            Închide
          </Button>
        </Modal.Body>
      </Modal>

      {/* Modal pentru "Servicii" */}
      <Modal show={showServiciiModal} onHide={handleCloseServiciiModal}>
        <Modal.Header closeButton>
          <Modal.Title>Servicii</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Informațiile statice despre servicii */}
          <p>
            <b>
              Principalii piloni pe care se bazează activitățile Grupului sunt:
            </b>
          </p>

          <p>
            <li> Închiriere de mașini (închiriere și leasing operațional)</li>
            <li>
              Activități internaționale (închiriere și leasing operațional și
              vânzări de mașini)
            </li>
            <li>Vânzări de mașini (Import/Distribuție/Vânzări cu amănuntul)</li>
          </p>
          <p>
            Deține cea mai mare flotă privată de vehicule, cu peste 44.000 de
            vehicule și peste 143 de puncte de vânzare în Grecia și în
            străinătate. Grupul oferă servicii integrate și inovatoare care
            răspund nevoilor fiecărui client în orice moment și continuă să
            inoveze, oferind mereu noi servicii. Ca, companie specializată în
            furnizarea de servicii, Autohellas acordă o mare importanță
            resurselor sale umane, care numără acum peste 1.300 de persoane,
            resursa umana se află în centrul afacerii sale. Vedeți o scurtă
            istorie cu cele mai importante repere din istoria Autohellas.
          </p>
          {/* Poți adăuga orice alte informații aici */}

          {/* Butonul pentru închidere */}
          <Button variant="secondary" onClick={handleCloseServiciiModal}>
            Închide
          </Button>
        </Modal.Body>
      </Modal>

      {/* Modal pentru "Contact" */}
      <Modal show={showContactModal} onHide={handleCloseContactModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Informațiile statice despre contact */}
          <p>Puteți să ne contactați la</p>
          <p>
            <Badge pill bg="primary">
              Telefon:
            </Badge>{" "}
            0722020202
          </p>
          <p>
            <Badge pill bg="primary">
              Email:
            </Badge>{" "}
            example@example.com
          </p>
          {/* Poți adăuga orice alte informații aici */}

          {/* Butonul pentru închidere */}
          <Button variant="secondary" onClick={handleCloseContactModal}>
            Închide
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBarScroll;
