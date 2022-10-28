import Card from "react-bootstrap/Card";

const CommentCard = ({comment}) => {
  return (
    <Card className="single-comment">
      <Card.Body>
        <Card.Title>{comment.title}</Card.Title>
        <Card.Subtitle>by: {comment.email}</Card.Subtitle>
        <Card.Text>{comment.body}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CommentCard;