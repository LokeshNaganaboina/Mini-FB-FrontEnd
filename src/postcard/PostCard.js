import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./PostCard.css";

// PostCard will take header(username), body
const PostCard = (props) => {
  const {user, date, body} = props;
  return (
  <Card>
    <Card.Header>
      {user}
      <Card.Text>{date}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {body.post}
      </Card.Text>
      <div className='postcard-btn-div'>
        <Button 
        className="postcard-button" 
        variant="primary"
        onClick={() => props.likeButtonHandler(body)}>
          {body.likes.length} Like
        </Button>

        <Button 
        className="postcard-button" 
        variant='primary'
        onClick={() => props.dislikeButtonHandler(body)}>
          {body.dislikes.length} Dislike
        </Button>
      </div>
    </Card.Body>
  </Card>
  );
}


export default PostCard;