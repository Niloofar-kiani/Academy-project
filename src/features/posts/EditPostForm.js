import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPostById, updatePost, deletePost} from "./postsSlice";
import {useParams, useNavigate} from "react-router-dom";
import {Col, Card, Form, Button} from "react-bootstrap";

import {selectAllUsers} from "../users/usersSlice";

const EditPostForm = () => {
  const {postId} = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          }),
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({id: post.id})).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <Col md={8} sm={12} className="mx-auto">
      <div className="cards">
        <Card className="single-card">
          <Card.Body>
            <Form>
              <Card.Title>Edit Post</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={onTitleChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Author</Form.Label>
                <Form.Select
                  aria-label="Select Author"
                  id="postAuthor"
                  value={userId}
                  onChange={onAuthorChanged}
                >
                  <option value="">-</option>
                  {usersOptions}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                 id="postContent"
                 name="postContent"
                 value={content}
                 onChange={onContentChanged}
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{height: "100px"}}
                />
              </Form.Group>

              <Button
              variant="primary"
                type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
              >
                Save Post
              </Button>
              <Button
              variant="danger"
              className="ms-2"
                type="button"
                onClick={onDeletePostClicked}
              >
                Delete Post
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default EditPostForm;
