import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css"
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ReviewsPage.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Book from "./Book"
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const is_librarian = currentUser?.is_librarian === true;

  const addBookIcon = (
    <Container className={`my-3 ${appStyles.Content} text-center`}>
      <Button className={`${btnStyles.Button} ${btnStyles.Orange}`} to="/library/create">
        <i className="fa fa-plus-square"></i>Add Book
      </Button>
    </Container>
  );

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: book }] = await Promise.all([
          axiosReq.get(`/library/${id}`),
        ]);
        setBook({ results: [book] });
        console.log(book);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div className="h-100">
      {is_librarian && addBookIcon}
      <Book {...book.results[0]} setBook={setBook} bookPage />
      <Container className={appStyles.Content}>Reviews</Container>
    </div>
  );
}

export default BookPage;