import {useDispatch} from "react-redux";
import {reactionAdded} from "./postsSlice";
import {UilThumbsUp, UilRocket} from "@iconscout/react-unicons";

const reactionEmoji = {
  like: <UilThumbsUp size="30" color="#038A67" />,
  rocket: <UilRocket size="30" color="#EA8A21" />,
};

const ReactionButtons = ({post}) => {

    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="reactionButton"
          onClick={() =>
            dispatch(reactionAdded({postId: post.id, reaction: name}))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      );
    });

    return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
