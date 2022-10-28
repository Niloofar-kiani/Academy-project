import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Col, Card, Form, Button} from "react-bootstrap";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <Col md={8} sm={12} className="mx-auto">
        <div className="cards">
          <Card className="single-card">
            <Card.Body>
              <Form>
                <Card.Title>Add New Post</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    type="text"
                    id="postTitle"
                    name="postTitle"
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
               
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Col>
    )
}
export default AddPostForm