import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/BookCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";

function BookCreateForm() {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        ISBN: "",
        publisher: "",
        published: "",
        blurb: "",
        seriesTitle: "",
        seriesBookNo: "",
        seriesLinks: [],
    });

    const { title, author, ISBN, publisher, published, blurb, seriesTitle, seriesBookNo, seriesLinks } = bookData;
    
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            const { data } = await axiosReq.get("/library/");
            const results = []
            // Store results in the results array
            data.forEach((value) => {
                results.push({
                key: value.title,
                value: value.id,
                });
            });
            // Update the options state
            setOptions([
                {key: 'Select a book', value: ''}, 
                ...results
            ])
        }
    
        // Trigger the fetch
        fetchData();
    }, []);

    const handleChange = (event) => {
        setBookData({
          ...bookData,
          [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("title", title);
        formData.append("author", author);
        formData.append("ISBN", ISBN);
        formData.append("publisher", publisher);
        formData.append("published", published);
        formData.append("blurb", blurb);
        formData.append("seriesTitle", seriesTitle);
        formData.append("seriesBookNo", seriesBookNo);
        formData.append("seriesLinks", seriesLinks);

    
        try {
            const { data } = await axiosReq.post("/library/", formData);
            history.push(`/library/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <h1 className={styles.Header}>Add a Book</h1>
            <Form.Group controlId="title">
                <Form.Label className="d-none">Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Title" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="author">
                <Form.Label className="d-none">Author</Form.Label>
                <Form.Control type="text" placeholder="Enter Author" name="author" value={author} onChange={handleChange} />
            </Form.Group>
            {errors?.author?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="ISBN">
                <Form.Label className="d-none">ISBN</Form.Label>
                <Form.Control type="text" placeholder="Enter ISBN" name="ISBN" value={ISBN} onChange={handleChange} />
            </Form.Group>
            {errors?.ISBN?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="publisher">
                <Form.Label className="d-none">Publisher</Form.Label>
                <Form.Control type="text" placeholder="Enter Publisher" name="publisher" value={publisher} onChange={handleChange} />
            </Form.Group>
            {errors?.publisher?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="published">
                <Form.Label className="d-none">Date published</Form.Label>
                <Form.Control type="date" placeholder="Date Published" name="published" value={published} onChange={handleChange} />
            </Form.Group>
            {errors?.published?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="blurb">
                <Form.Label className="d-none">Blurb</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Blurb" name="blurb" value={blurb} onChange={handleChange} />
            </Form.Group>
            {errors?.blurb?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="seriesTitle">
                <Form.Label className="d-none">Series Title</Form.Label>
                <Form.Control type="text" placeholder="Series title" name="seriesTitle" value={seriesTitle} onChange={handleChange} />
            </Form.Group>
            {errors?.seriesTitle?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="seriesBookNo">
                <Form.Label className="d-none">Series Title</Form.Label>
                <Form.Control type="text" placeholder="Number in series" name="seriesBookNo" value={seriesBookNo} onChange={handleChange} />
            </Form.Group>
            {errors?.seriesBookNo?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="seriesLinks">
                <Form.Label className="d-none">Other books in series</Form.Label>
                <Form.Control multiple as="select" placeholder="Other books in series" name="seriesLinks" value={seriesLinks} onChange={handleChange}>
                    {options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                            {option.key}
                            </option>
                        );
                    })}
                </Form.Control>
            </Form.Group>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            publish
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => {}}
            >
            cancel
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Container className={appStyles.Content}>{textFields}</Container>
        </Form>
    );
}

export default BookCreateForm;