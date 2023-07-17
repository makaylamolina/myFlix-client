import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://you-can-run.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api: ", data);

        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Director: {
              Name: movie.Director.Name
            },
            Genre: {
              Name: movie.Genre.Name
            },
            Featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
    }, [token]);

    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
          }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onLogout={onLogout}
                      />
                    </Col>
                  )}
                </>
              }
            />  

            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>This list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        setUser={setUser}
                        token={token}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>This list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={4}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>

          {user && (
            <Col md={1}>
              <Button
                variant="secondary"
                onClick={onLogout}
              >
                Logout
              </Button>
            </Col>
          )}
        </Row>
      </BrowserRouter>
    );
  };
