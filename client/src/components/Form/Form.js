import react from "react";
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FormCustom = ({ show, setShow }) => {
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [validated, setValidated] = useState(false);


  const handleSubmit = (event) => {
    var data = new FormData();

    data.append("year", year);
    data.append("subject", subject);
    data.append("description", description);
    data.append("file", file);

    axios.post(
      "http://localhost:3001/upload",
      data, {
      /* receives two parameter : endpoint url ,form data */
    })
      .then(res => {
        /* then print response status */
        console.log(res.statusText)
      })

    setValidated(true);
    setShow(false);
  }

  const handleYearChange = (event) => setYear(event.target.value);

  const handleSubjectChange = (event) => setSubject(event.target.value);

  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleFileSelect = (event) => setFile(event.target.files[0]);

  const handleClose = () => setShow(false);

  return (
    <Form noValidate validated={validated}>

      <Form.Group className="mb-3" md="4" >
        <Form.Label>Year</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Year"
          onChange={handleYearChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" md="4" >
        <Form.Label>Subject</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Subject"
          onChange={handleSubjectChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" md="4" >
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          type="textarea"
          rows={3}
          onChange={handleDescriptionChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" md="4" >
        <Form.Label>File</Form.Label>
        <br />
        <Form.Control
          required
          type="file"
          placeholder="choose file"
          onChange={handleFileSelect}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" onClick={handleSubmit}>Submit form</Button>

      <div style={{ float: 'right' }}>
        <Button type="submit" variant="secondary" onClick={handleClose}>Close</Button>
      </div>
    </Form>

  );

}

export default FormCustom;


