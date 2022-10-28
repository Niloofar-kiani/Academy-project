import {useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

const PostAuthor = ({userId}) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <h5>by {author ? author.name : "Unknown author"}</h5>;
};
export default PostAuthor;
