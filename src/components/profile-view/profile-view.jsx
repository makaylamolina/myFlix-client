import { useState, useEffect } from "react";
import { Button, Form, Col, Row, Modal, ModalHeader } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, setUser, token, movies, onlogout }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);

  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id)
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Update failed.")
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        onlogout();
      } else {
        alert ("Something went wrong.")
      }
    })
  }

  return (
    <>
      <h1>Profile</h1>
      <Row>
        <Col>
          <div>Username: {user.Username}</div>
          <div>Email: {user.Email}</div>
        </Col>
      </Row>
      <Row>
        <h3>Favorite Movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={4}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
      <Row>
        <h3>Update your information:</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Save changes</Button>
        </Form>
      </Row>
      <Button variant="primary" onClick={handleShowModal}>
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <ModalHeader closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </ModalHeader>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
          <Button variant="primary" onClick={handleCloseModal}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};