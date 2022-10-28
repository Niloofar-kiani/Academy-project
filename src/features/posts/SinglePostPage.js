import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {UilEdit} from "@iconscout/react-unicons";
import CommentsList from "../comments/CommentsList";

const SinglePostPage = () => {
  const {postId} = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  return (
    <Col md={8} sm={12} className="mx-auto">
      <div className="cards">
        <Card className="single-card">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/350/150?random=${post.id}`}
          />
          <Card.Body>
            <Card.Title>
              {post.title}
              <Link to={`/post/edit/${post.id}`} className="ms-2">
                <UilEdit color="#61DAFB" />
              </Link>
            </Card.Title>
            <Card.Text>{post.body}</Card.Text>

            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />

            <ReactionButtons post={post} />
          </Card.Body>
          <Col>
          <h4 className="ms-3">Comments:</h4>
            <CommentsList />
          </Col>
        </Card>
      </div>
    </Col>
  );
};

export default SinglePostPage;
