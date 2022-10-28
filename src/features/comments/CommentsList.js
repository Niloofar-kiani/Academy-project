import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CommentCard from "./CommentCard";
import {
  selectAllComments,
  getCommentsStatus,
  getCommentsError,
} from "./commentsSlice";

const CommentsList = () => {
  const comments = useSelector(selectAllComments);
  const commentsStatus = useSelector(getCommentsStatus);
  console.log(commentsStatus);
  const error = useSelector(getCommentsError);

  let commentsTxt;

  if (commentsStatus === "loading") {
    commentsTxt = <p>"Loading..."</p>;
  } else if (commentsStatus === "succeeded") {
    const orderedComments = comments.comments;

    commentsTxt =
      orderedComments &&
      orderedComments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ));
  } else if (commentsStatus === "failed") {
    commentsTxt = <p>{error}</p>;
  }

  return (
      <div className="cards">{commentsTxt}</div>
  );
};
export default CommentsList;
