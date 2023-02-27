import React from "react";
import styles from "../../styles/Book.module.css";
import { Card, Col, Row } from "react-bootstrap";

const Book = (props) => {
  const {
    id,
    title,
    author,
    cover,
    ISBN,
    publisher,
    published,
    blurb,
    series_title,
    series_book_no,
    series_links,
  } = props;

  return (
    <>
      <Card className={styles.Book}>
        <Card.Body>
          <Card.Title className="text-center">{title} by {author}</Card.Title>
          <Row>
            <Col className={`my-auto d-none d-md-block p-2 ${styles.CoverCol}`} md={6}>
              <Card.Img src={cover} alt={title} />
            </Col>
            <Col xs={12} md={6}>
              {ISBN && <Card.Text>{ISBN}</Card.Text>}
              {publisher && <Card.Text>{publisher}</Card.Text>}
              {published && <Card.Text>{published}</Card.Text>}
              {blurb && <Card.Text>{blurb}</Card.Text>}
              {series_title && <Card.Text>{series_title}</Card.Text>}
              {series_book_no && <Card.Text>{series_book_no}</Card.Text>}
              {series_links && <Card.Text>{series_links}</Card.Text>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Book;