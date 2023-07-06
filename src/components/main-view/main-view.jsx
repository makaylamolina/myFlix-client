import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://you-can-run.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("books from api: ", data);

        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
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

    if (!user) {
      return (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </>
      );
    }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>

      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        ))
      )}
    </div>
  );
};