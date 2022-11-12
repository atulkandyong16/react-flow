import React, { useState } from 'react';
import { FormBuilder, FormGenerator } from 'cb-react-forms';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import 'json-form-custom-element';


function App() {
  const [show, setShow] = useState(false);
  let formData1 = [];
  const [formJson, setformJson] = useState({
    type: "object",
    properties: {
    }
  });

  const updateElements = () => {
    formData1.forEach((e) => {
      formJson.properties[e.id] = {
        title: e.label.blocks[0].text,
        type: "string"
      }
    });
  };

  const handleClose = () => setShow(false);

  const items = [
    {
      key: "Header",
      name: "Header Text",
      icon: "fa fa-header"
    },
    {
      key: "TextInput",
      name: "TextInput",
      icon: "fa fa-paragraph"
    },

  ];

  const onSubmitFunc = (data) => {
    formData1 = JSON.parse(data);
    updateElements();
    setShow(true);
  };


  return (
    <>
      <FormBuilder items={items}
        onSubmit={onSubmitFunc}
      />

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Form Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <json-form schema={JSON.stringify(formJson)} value='{}' config='{}'></json-form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <code>
                      {JSON.stringify(formJson)}
                    </code>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
