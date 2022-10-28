import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";

const PostsCard = ({post}) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`https://picsum.photos/350/200?random=${post.id}`}
      />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body.substring(0, 75)}...</Card.Text>

        <Link className="custom-btn btn-post" to={`post/${post.id}`}>
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />

        <ReactionButtons post={post} />
      </Card.Body>
    </Card>
  );
};
export default PostsCard;
