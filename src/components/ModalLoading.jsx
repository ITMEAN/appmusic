import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { ApiLogin } from "../api/indext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { resetRole, setRole, useAppContext } from "../context/AppContext";
import { login } from "../service/AuthService";

export default function LoadingModal({ showed, onHide }) {
  
  return (
    <Modal show={showed} onHide={onHide}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
         <h1 style={{textAlign:'center'}}>Loading...</h1>
         <Spinner animation="border" role="status"></Spinner>
      </Modal.Body>
    </Modal>
  );
}


