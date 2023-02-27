import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";

function ReviewCreateForm() {
    const [reviewData, setReviewData] = useState({
        book: "",
        title: "",
        description: "",
        bookStarted: "",
        bookFinished: "",
        rating: "",
        tags: "",
        draft: "",
    });

    const { book, title, description, bookStarted, bookFinished, rating, tags, draft } = reviewData;
    
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
                })
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
        setReviewData({
          ...reviewData,
          [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("book", book);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("bookStarted", bookStarted);
        formData.append("bookFinished", bookFinished);
        formData.append("rating", rating);
        formData.append("tags", tags);
        formData.append("draft", draft);
    
        try {
            const { data } = await axiosReq.post("/reviews/", formData);
            history.push(`/reviews/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <h1 className={styles.Header}>Add a Review</h1>
            <Form.Group controlId="book">
                <Form.Label className="d-none">Book</Form.Label>
                <Form.Control as="select" placeholder="Book Title" name="book" value={book} onChange={handleChange}>
                    {options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                            {option.key}
                            </option>
                        );
                    })}
                </Form.Control>
            </Form.Group>
            {errors?.book?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="title">
                <Form.Label className="d-none">Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Review Title" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="rating">
                <Form.Label className="d-none">Rating</Form.Label>
                <Form.Control as="select" placeholder="Rating" name="rating" value={rating} onChange={handleChange}>
                    <option key="blankChoice">Select rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Control>
            </Form.Group>
            {errors?.rating?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="description">
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Review Description" name="description" value={description} onChange={handleChange} />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="bookStarted">
                <Form.Label className="d-none">Date started</Form.Label>
                <Form.Control type="date" placeholder="Date Started" name="bookStarted" value={bookStarted} onChange={handleChange} />
            </Form.Group>
            {errors?.bookStarted?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="bookFinished">
                <Form.Label className="d-none">Date finished</Form.Label>
                <Form.Control type="date" placeholder="Date Finished" name="bookFinished" value={bookFinished} onChange={handleChange} />
            </Form.Group>
            {errors?.bookFinished?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="tags">
                <Form.Label className="d-none">Tags</Form.Label>
                <Form.Control type="text" placeholder="Tags" name="tags" value={tags} onChange={handleChange} />
            </Form.Group>
            {errors?.tags?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="draft">
                <Form.Check type="switch" label="Draft?" name="draft" value={draft} onChange={handleChange} />
            </Form.Group>
            {errors?.draft?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button className={`${btnStyles.Button} ${btnStyles.Orange}`} type="submit">
            publish
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                onClick={() => history.goBack()}
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

export default ReviewCreateForm;