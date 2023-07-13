import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card
      className='h-100'
      border='primary'
      style={{ cursor: 'pointer' }}
    >
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        className='border'
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};