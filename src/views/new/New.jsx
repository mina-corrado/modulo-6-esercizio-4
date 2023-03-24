import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const NewBlogPost = props => {
  const [text, setText] = useState("");
  const handleChange = useCallback(value => {
    setText(value);
  });
  const onSubmit = (event) => {
    event.preventDefault();

    
    const form = event.currentTarget;
    // console.log(form);
    if (form.checkValidity() === false) {
      return;
    }
    
    const data = {
      title: form.querySelector('#blog-form').value,
      category: form.querySelector('#blog-category').value,
      content: text
    };
    const headers = {
        headers: {
        "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
    }

    fetch('http://localhost:3000/blogPosts', headers).then(res=>res.json())
    .then(res=>{
      // reset
      form.querySelector('#blog-form').value = '';
      form.querySelector('#blog-category').value = '';
      setText('');
    }, (err)=>{
        //gestione errore
        console.log(err);
    })
  }
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={onSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
