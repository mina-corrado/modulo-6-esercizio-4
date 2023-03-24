import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import BlogPagination from "./BlogPagination";

const BlogList = props => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  
  useEffect(()=>{

    fetch(`http://localhost:3000/blogPosts?page=${page}&size=${props.size}`).then(res=>res.json())
    .then(res=>{
      // successo
      setCount(res.count)
      setPosts(res.results);
    }, (err)=>{
        //gestione errore
        console.log(err);
    })
  }, [page])
  
  return (
    <>
    <Row>
      {posts.map((post, i) => (
        <Col
        key={`item-${i}`}
        md={4}
        style={{
          marginBottom: 50,
        }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
    <Row>
      <Col md={12}>
        <BlogPagination 
          page={page} 
          count={Math.ceil(count/props.size)}
          handlePage={(aPage) => setPage(aPage)} 
        />
      </Col>
    </Row>
    </>
  );
};

export default BlogList;
