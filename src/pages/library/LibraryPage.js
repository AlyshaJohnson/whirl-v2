import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"

import Book from "./Book";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/ReviewsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import NoResults from "../../assets/no-results.png";

function LibraryPage({ message, filter = "" }) {
  const [books, setBooks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();
  const is_librarian = currentUser?.is_staff === true;

  const addBookIcon = (
    <Button
      to="/library/create"
    >
      <i className="far fa-plus-square"></i>Add Book
    </Button>
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(`/library/?${filter}search=${query}`);
        setBooks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
        fetchBooks();
      }, 1000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

    return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            {is_librarian && addBookIcon}
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
                <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="text"
                    className="mr-sm-2"
                    placeholder="Search books"
                />
            </Form>
            {hasLoaded ? (
              <>
                {books.results.length ? (
                  <InfiniteScroll
                    children={books.results.map((book) => (
                      <Book key={book.id} {...book} setBooks={setBooks} />
                    ))}
                    dataLength={books.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!books.next}
                    next={() => fetchMoreData(books, setBooks)}
                  />
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset src={NoResults} message={message} />
                  </Container>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </Col>
        </Row>
      );
    }

export default LibraryPage;
