import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/posts/1/comments`,
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = [...action.payload];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllComments = (state) => state.comments;
export const getCommentsStatus = (state) => state.comments.status;
export const getCommentsError = (state) => state.comments.error;

export const selectCommentById = (state, postId) =>
  state.posts.comments.find((comment) => comment.postId === postId);

export default commentsSlice.reducer;
