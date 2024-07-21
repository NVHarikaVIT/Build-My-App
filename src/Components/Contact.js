import React from 'react';
import {Container, Button, Form} from 'react-bootstrap';
function Contact() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"> Make My Website</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
      </nav>
      <Container className='container my-15' style={{position: "relative", top: "100px"}}>
        <h2> Contact Us </h2>
        <Form>
            <Form.Group>
                <Form.Label> First Name </Form.Label>
                <Form.Control type='text' placeholder='Your first name'required></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Last Name </Form.Label>
                <Form.Control type='text' placeholder='Your last name'required></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Email </Form.Label>
                <Form.Control type='email' placeholder='Email'required></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Phone No. </Form.Label>
                <Form.Control type='phone' placeholder='Phone'required></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Enter your problem or feedback here...</Form.Label>
                <Form.Control type='textarea' className='rows-5'></Form.Control>
            </Form.Group>
            <Button type='submit' className='btn-primary'> Submit </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Contact;
