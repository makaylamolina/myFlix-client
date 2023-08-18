import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [ Favorite, setFavorite ] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setFavorite(isFavorited)
  }, []);

  const removeFavorite = () => {
    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const addFavorite = () => {
    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };
  
  const movie = movies.find((m) => m._id === movieId);

  // return (
  //   <Card border="0">
  //     <Card.Img variant="right" src={movie.ImagePath} width="300" alt={movie.Title} className="m-3"/>
  //     <Card.Body className="m-3">
  //       <Card.Title>{movie.Title}</Card.Title>
  //       <Card.Text>Description: {movie.Description}</Card.Text>
  //       <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
  //     </Card.Body>

  //     {Favorite ? (
  //       <Button onClick={removeFavorite} className="m-2">Remove favorite</Button>
  //     ) : (
  //       <Button onClick={addFavorite} className="m-2">Add favorite</Button>
  //     )}

  //     <Link to={"/"}>
  //       <Button className="m-3">Back</Button>
  //     </Link>
  //   </Card>
  // )

  return (
    <div>
      <img
        src={movie.ImagePath}
        width="300"
        alt={movie.Title}
        className="my-4"
      />
      <div className="my-3">
        <strong className="me-2">Title:</strong>
        <span>{movie.Title}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Description:</strong>
        <span>{movie.Description}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Genre:</strong>
        <span>{movie.Genre.Name}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Director:</strong>
        <span>{movie.Director.Name}</span>
      </div>
      <div className="my-4">
        <Link to={"/"}>
          <Button className="m-3">Back</Button>
        </Link>
        {Favorite ? (
          <Button onClick={removeFavorite} className="m-2">Remove favorite</Button>
        ) : (
          <Button onClick={addFavorite} className="m-2">Add favorite</Button>
        )}
      </div>
    </div>
  )
}
