import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card} from "react-bootstrap";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [ Favorite, setFavorite ] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setFavorite(isFavorited)
  }, []);

  const removeFavorite = () => {
    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}/${movieId}`, {
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
    fetch(`https://you-can-run.herokuapp.com/users/${user.Username}/${movieId}`, {
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
  
  const movie = movies.find((m) => m.Title === movieId);

  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
      </Card.Body>

      {Favorite ? (
        <Button onClick={removeFavorite}>Remove from favorites</Button>
      ) : (
        <Button onClick={addFavorite}>Add to favorites</Button>
      )}

      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
    </Card>
  )

  // return (
  //   <div>
  //     <div>
  //       <img className="w-100" src={movie.ImagePath} />
  //     </div>
  //     <div>
  //       <span>Title: </span>
  //       <span>{movie.Title}</span>
  //     </div>
  //     <div>
  //       <span>Description: </span>
  //       <span>{movie.Description}</span>
  //     </div>
  //     <div>
  //       <span>Director: </span>
  //       <span>{movie.Director.Name}</span>
  //     </div>
  //     <div>
  //       <span>Genre: </span>
  //       <span>{movie.Genre.Name}</span>
  //     </div>

  //     {isFavorite ? (
  //       <Button onClick={removeFavorite}>Remove from favorites</Button>
  //     ) : (
  //       <Button onClick={addFavorite}>Add to favorites</Button>
  //     )}

  //     <Link to={"/"}>
  //       <Button>Back</Button>
  //     </Link>
  //   </div>
  // )
}
