import { useState } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Exorcist",
      image: "https://m.media-amazon.com/images/I/81+hQdlnKWL._AC_UY327_FMwebp_QL65_.jpg",
      description: "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
      director: "William Friedkin",
      genre: "Horror"
    },
    {
      id: 2,
      title: "The Silence of the Lambs",
      image: "https://m.media-amazon.com/images/I/A16clOJZvOL._AC_UY327_FMwebp_QL65_.jpg",
      description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      director: "Jonathan Demme",
      genre: "Crime"
    },
    {
      id: 3,
      title: "The Sixth Sense",
      image: "https://m.media-amazon.com/images/I/711uZBBjIeL._AC_UY327_FMwebp_QL65_.jpg",
      description: "Malcom Crowe, a child psychologist, starts treating a young boy, Cole, who encounters dead people and convinces him to help them. In turn, Cole helps Malcolm reconcile with his estranged wife.",
      director: "M. Night Shyamalan",
      genre: "Thriller"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>This list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))
      }
    </div>
  );
};