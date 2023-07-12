import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <Button onClick={onBackClick}>Back</Button>
    </div>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default MovieView;